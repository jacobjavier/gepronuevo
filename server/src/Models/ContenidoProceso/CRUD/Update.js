export default function Update(con, data) {
  con.query(
    'UPDATE contenido_proceso SET nombre= ?, descripcion = ?, estatus=? where id = ?',
    [data.nombre, data.descripcion, data.estatus, data.id],
    (error, result, fields) => {
      if (error) throw error;
      if (result.length <= 0) throw 'No se encontraron valores para actualizar';
    }
  );
}
