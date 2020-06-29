export default function HandleTableBlur(
  idxRow,
  idxCell,
  savedValue,
  value,
  id
) {
  return new Promise((resolve, reject) => {
    if (savedValue !== value) {
      let options = {
        method: 'POST',
        body: JSON.stringify({ id: id, value: value }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      fetch(`${process.env.REACT_APP_API}/contenidoproceso/update`, options)
        .then(response => {
          return response.json();
        })
        .then(jsonResponse => {
          //console.log('Update', jsonResponse);
          if (jsonResponse.code === 200) {
            resolve({ value: value, idxRow: idxRow, idxCell: idxCell });
          }
          throw jsonResponse;
        });
    }
    resolve(null);
  });
}
