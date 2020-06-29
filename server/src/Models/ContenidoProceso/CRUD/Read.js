export default function Read(con, data) {
  return new Promise((promResult, reject) => {
    con.query(
      `SELECT * FROM contenido_proceso where id = ?;`,
      [data.id],
      (error, queryResult, fields) => {
        if (error) throw error;
        if (queryResult.length <= 0) throw 'No se encontraron valores al leer el proceso';
        promResult(queryResult);
      }
    );
  });
}
