import ParseEvent from './ParseEventCell';
function GetEvents(processId) {
  return new Promise(async (resolve, reject) => {
    let titlesData = [];
    let queryColumnsResponse = await getColumns(processId);
    queryColumnsResponse.map(titleCell => {
      titlesData.push({
        value: titleCell['nombre'],
        description: titleCell['description'],
        type: 'title'
      });
    });
    let processData = [];
    let queryRowsResponse = await getRows(processId);
    queryRowsResponse.map(event => {
      processData.push(ParseEvent(event));
    });
    let temp = [[...titlesData], ...processData];
    resolve({ titles: titlesData, rows: processData, temp: temp });
  });
}

async function getRows(processId) {
  let userId = localStorage.getItem('userid');
  let jsonResponse = await fetch(
    `${process.env.REACT_APP_API}/contenidoproceso/getFromProcess/${processId}/${userId}`,
    { method: 'GET' }
  ).then(response => response.json());
  return jsonResponse;
}

async function getColumns(processId) {
  let jsonResponse = await fetch(
    `${process.env.REACT_APP_API}/columna/getFromProcess/${processId}`
  ).then(response => response.json());
  return jsonResponse.response;
}
export default GetEvents;
