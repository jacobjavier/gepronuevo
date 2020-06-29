export default function Create(con, data) {
  return new Promise((resolve, reject) => {
    con.query(
      'INSERT INTO contenido_proceso(nombre ,descripcion, fk_estatus) VALUES(?, ?, ?, ? )',
      [data.nombre, data.descripcion, data.fk_estatus],
      (error, result, fields) => {
        if (error) throw error;
        resolve('200');
      }
    );
  });
}
