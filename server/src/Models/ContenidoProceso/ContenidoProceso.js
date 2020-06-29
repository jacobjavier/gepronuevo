import Mysql from './../Mysql';
import Create from './CRUD/Create';
// import Update from './CRUD/Update';
import Read from './CRUD/Read';
import Delete from './CRUD/Delete';
import fs from 'fs';
import path from 'path';

export default class ContenidoProceso {
  constructor() {
    this.con = Mysql();
  }
  create(data) {
    return Create(this.con, { id: 1 });
  }
  updateContent(data) {//el update no ejecuta limpia en automatico
    return new Promise((resolve, reject) => {
      this.con.query(
        `UPDATE contenido_proceso 
        SET contenido = ? 
        WHERE id = ?`,
        [data.value, data.id],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0)
            throw 'No se encontraron valores en el proceso';
          resolve(200);
        }
      );
    });
  }
  read(data) {
    return Read(this.con, data);
  }
  getFromEvent(data) {
    return new Promise((resolve, reject) => {
      let sqlPath = path.resolve(__dirname, 'ReadFromEvent.sql');
      let sql = fs.readFileSync(sqlPath, 'UTF-8');
      this.con.query(sql, [data.userId, data.id], (error, results, fields) => {
        if (error) throw error;
        let arrayResults = [];
        results.map(row => {
          arrayResults.push(row);
        });
        resolve(arrayResults);
      });
    });
  }
  getFromProcess(data) {
    let sqlPath = path.resolve(__dirname, './ReadProcess.sql');
    let sql = fs.readFileSync(sqlPath, 'UTF-8');
    let arrayResponse = [];
    let response = new Promise((promResult, reject) => {
      this.con.query(
        sql,
        [data.user_id, data.fk_proceso],
        (error, queryResult, fields) => {
          if (error) reject('Error en la consulta');
          let tempArray = [];
          queryResult.map(row => {
            let event_id = row['event_id'];
            if (!tempArray[event_id]) {
              tempArray[event_id] = [];
              /*
                {
                  event_data: {
                    event_id: event_id,
                    status: row['event_status']
                  },
                  content: []
                };
                */
            }
            tempArray[event_id].push(row);
          });
          Object.keys(tempArray).map(key => {
            arrayResponse.push(tempArray[key]);
          });
          promResult(arrayResponse.reverse());
        }
      );
    });
    return response;
  }
  delete(data) {
    return Delete(this.con);
  }
}
