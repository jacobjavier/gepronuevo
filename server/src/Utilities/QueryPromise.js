export default function QueryPromise(connection, query, args) {
  return new Promise((resolve, reject) => {
    connection.query(query, args, (error, result, fields) => {
      resolve({ error: error, result: result, fields: fields });
    });
  });
}
