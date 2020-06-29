export default function GetProceduresOptions() {
  return new Promise(async (resolve, reject) => {
    let jsonProcedures = await fetchData();
    let arrayProcedures = [];
    jsonProcedures.response.map(procedure => {
      let formattedProcedure = {
        value: procedure.id,
        text: procedure.nombre,
        description: procedure.descripcion
      };
      arrayProcedures.push(formattedProcedure);
    });
    resolve(arrayProcedures);
  });
}
const fetchData = async () => {
  let options = {
    method: 'POST',
    body: JSON.stringify({
      userId: localStorage.getItem('userid')
    }),
    headers: { 'Content-Type': 'application/json' }
  };
  let url = `${process.env.REACT_APP_API}/proceso/getFromUser`;
  let jsonResponse = await fetch(url, options).then(r => r.json());
  return jsonResponse;
};
