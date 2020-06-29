import Mysql from '../Mysql';

export default class Process {
  constructor() {
    this.con = Mysql();
  }
  read(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM responsable where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error)
            throw {
              status: 500,
              errors: error,
              message: 'Error al buscar responsables'
            };
          //if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getFromProcess(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT 
          R.*  
        FROM responsable R 
        WHERE R.fk_proceso = ? 
        ORDER BY R.id `,
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          //       if (result.length <= 0) throw 'No se encontraron registros';
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `INSERT INTO responsable( 
            nombre , 
            color, 
            descripcion, 
            fk_proceso,
            fk_tipo) 
          VALUES( ?, ?, ?, ?, ? )`,
        [data.nombre, data.color, data.descripcion, data.fk_proceso],
        (error, result, fields) => {
          if (error)
            throw {
              status: 500,
              error: error,
              message: 'Error al momento de insertar'
            };
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  update(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `UPDATE responsable SET 
            nombre = ?, 
            color = ?, 
            descripcion = ?,
            fk_tipo = ?
          WHERE id = ?`,
        [data.nombre, data.color, data.descripcion, data.id],
        (error, result, fields) => {
          if (error)
            throw {
              status: 500,
              error: [error],
              message: 'Error al momento de actualizar'
            };
          if (result.length <= 0)
            throw {
              status: 500,
              error: 'No se encontraron registros',
              message: 'No se encontraron registros con ese responsable'
            };
          resolve({
            status: 200,
            error: null,
            message: 'Informacion actualizada correctamente',
            response: result
          });
        }
      );
    });
  }
  delete(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'DELETE FROM responsable where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          resolve({ status: 200, result: result });
        }
      );
    });
  }
}
