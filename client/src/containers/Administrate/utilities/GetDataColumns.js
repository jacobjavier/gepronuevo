import ParserServerColumn from './ParserServerColumn';
function GetDataColumns(processId) {
  return new Promise(async (resolve, reject) => {
    resolve({
      columns: await getColumns(processId),
      groups: await getGroups(processId),
      status: await getStatus(),
      types: await getTypes(),
      isObligatory: getIsObligatory(),
      process: getProcess(processId),
      users: await getUsers(),
      processData: await getProcessData(processId),
      responsiblesTypes: await getResponsiblesTypes()
    });
  });
}
function getProcess(processId) {
  return { id: processId };
}
async function getProcessData(processId) {
  let url = `${process.env.REACT_APP_API}/proceso/get/fromId/${processId}`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let processData = jsonResponse;
  return processData;
}
async function getColumns(processId) {
  let url = `${process.env.REACT_APP_API}/columna/getFromProcess/${processId}`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let columns = {};
  jsonResponse.response.map(row => {
    columns[row.id] = ParserServerColumn(row);
  });
  return columns;
}
async function getTypes() {
  let url = `${process.env.REACT_APP_API}/catalogos/getDataTypes`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let types = ['prueba'];
  jsonResponse.response.map(row => {
    types.push({
      text: row.nombre,
      value: row.id
    });
  });
  return types;
}
async function getStatus() {
  let url = `${process.env.REACT_APP_API}/catalogos/getStatus`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let status = [];
  jsonResponse.response.map(row => {
    status.push({
      text: row.nombre,
      value: row.id
    });
  });
  return status;
}
function getIsObligatory() {
  return [
    { text: 'Si', value: 2 },
    { text: 'No', value: 1 }
  ];
}
async function getGroups(processId) {
  let url = `${process.env.REACT_APP_API}/responsable/getFromProcess/${processId}`;
  let options = { method: 'get' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let groups = [];
  jsonResponse.response.map(row => {
    groups[row.id] = {
      id: row.id,
      color: row.color,
      description: row.descripcion,
      name: row.nombre,
      text: row.nombre,
      value: row.id,
      fk_process: row.fk_proceso,
      responsibleType: row.fk_tipo
    };
  });
  return groups;
}
async function getUsers() {
  let url = `${process.env.REACT_APP_API}/usuarios/get`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let users = [];
  jsonResponse.response.map(row => {
    users.push({
      text: row.usuario,
      value: row.id
    });
  });
  return users;
}
async function getResponsiblesTypes() {
  let url = `${process.env.REACT_APP_API}/catalogos/getResponsibleTypes`;
  let options = { method: 'GET' };
  let jsonResponse = await fetch(url, options).then(r => r.json());
  let types = [];
  jsonResponse.response.map(row => {
    types.push({
      text: row.nombre,
      value: row.id
    });
  });
  return types;
}
export default GetDataColumns;
