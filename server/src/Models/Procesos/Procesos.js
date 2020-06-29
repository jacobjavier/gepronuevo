import Mysql from './../Mysql';
import fs from 'fs';
import path from 'path';
export default class Process {
  constructor() {
    this.con = Mysql();
  }
  readAll() {
    return new Promise((resolve, reject) => {
      this.con.query('SELECT * FROM proceso', (error, result, fields) => {
        if (error) throw error;
        //    if (result.length <= 0) throw 'No se encontraron registros';
        resolve(result);
      });
    });
  }
  getAvaibles() {
    return new Promise((resolve, reject) => {
      this.con.query(
        `SELECT * FROM proceso WHERE fk_estatus='1' ORDER BY id DESC`,
        (error, result, fields) => {
          if (error) throw error;
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  getAdministrables(data) {
    return new Promise((resolve, reject) => {
      let sqlPath = path.resolve(__dirname, 'GetAdministrables.sql');
      let sql = fs.readFileSync(sqlPath, 'UTF-8');
      this.con.query(sql, [data.userId, data.userId], (error, results) => {
        if (error) {
          reject({
            status: 500,
            message: 'Error al consultar en el servidor',
            error: error
          });
        }
        resolve(results);
      });
      this.con.query();
    });
  }
  getFromUser(data) {
    return new Promise((resolve, reject) => {
      let sqlPath = path.resolve(__dirname, 'GetFromUser.sql');
      let sql = fs.readFileSync(sqlPath, 'UTF-8');
      this.con.query(sql, [data.userId], (error, result, fields) => {
        if (error) {
          reject({
            status: 500,
            message: 'Error al momento de consultar',
            error: error
          });
        }
        resolve({ status: 200, result: result });
      });
    });
  }
  read(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM proceso where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          //    if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'INSERT INTO proceso(nombre ,descripcion, fk_estatus,fk_creador) VALUES(?, ?, 1,? )',
        [data.nombre, data.descripcion, data.userId],
        (error, result, fields) => {
          if (error) throw error;
          if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  update(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'UPDATE proceso SET nombre = ?, descripcion = ?, fk_estatus = ? where id = ?',
        [data.nombre, data.descripcion, data.fk_estatus, data.id],
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
        'DELETE FROM proceso where id = ?',
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
