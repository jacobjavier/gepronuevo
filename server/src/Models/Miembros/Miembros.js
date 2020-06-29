import Mysql from './../Mysql';

export default class Members {
  constructor() {
    this.con = Mysql();
  }
  getDefault(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM responsable_usuario where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getFromProcess(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT 
          RS.id AS id, 
          RS.fk_responsable,  
          RS.fk_usuario,
          R.nombre as responsable_nombre,
          U.nombre as usuario_nombre 
        FROM responsable_usuario  RS
        JOIN usuarios U ON U.id =  RS.fk_usuario 
        JOIN responsable R ON R.id =  RS.fk_responsable 
        JOIN proceso P ON P.id = R.fk_proceso
        WHERE P.id = ? 
        ORDER BY P.id `,
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          // if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getFromResponsible(data) {
    return new Promise((resolve, reject) => {
      console.log('data', data);
      let query = `SELECT usr.id,usr.usuario FROM copro.responsable_usuario AS resp_usr
        INNER JOIN werax.w_usuarios AS usr ON usr.id = resp_usr.fk_usuario
      WHERE fk_responsable =?`;
      this.con.query(query, [data.id], (error, result, fields) => {
        if (error) throw error;
        resolve({
          status: 200,
          result: result
        });
      });
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'INSERT INTO responsable_usuario (fk_responsable, fk_usuario) VALUES ( ?, ?)',
        [data.fk_responsable, data.fk_usuario],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  createFromJson(data) {
    return new Promise((resolve, reject) => {
      let arrayData = [];
      data.map((currentItem, index, array) => {
        arrayData.push([currentItem.fk_responsable, currentItem.fk_usuario]);
      });
      this.con.query(
        'INSERT INTO responsable_usuario (fk_responsable, fk_usuario) VALUES ?',
        [arrayData],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  updateFromJson(data) {
    return new Promise((resolve, reject) => {
      let arrayData = [];
      data.map((currentItem, index, array) => {
        arrayData.push([currentItem.fk_responsable, currentItem.fk_usuario]);
      });
      console.log(data);
      if (arrayData.length > 0) {
        // tomar el fk_responsable del primer item del arreglo
        // eliminar todos los usuarios de este grupo
        console.log(arrayData);
        this.con.query(
          'DELETE FROM responsable_usuario WHERE fk_responsable = ?',
          [arrayData[0][0]],
          (error, result, fields) => {
            if (error) throw error;
            if (result.length <= 0) throw 'No se encontraron registros';
            console.log(result);
            this.con.query(
              'INSERT INTO responsable_usuario (fk_responsable, fk_usuario) VALUES ?',
              [arrayData],
              (error, result, fields) => {
                if (error) throw error;
                console.log(result);
                if (result.length <= 0) throw 'No se encontraron registros';
                resolve(result);
              }
            );
          }
        );
        // insertarlos de nuevo
      }
    });
  }
  update(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'UPDATE  responsable_usuario SET fk_responsable = ?, fk_usuario = ? WHERE id = ?',
        [data.fk_responsable, data.fk_usuario, data.id],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  delete(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'DELETE FROM copro.responsable_usuario WHERE id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
}
