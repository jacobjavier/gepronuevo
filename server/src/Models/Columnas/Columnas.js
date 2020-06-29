var mysql = require('mysql');
import Mysql from './../Mysql';
import fs from 'fs';
import path from 'path';
export default class Columna {
  constructor() {
    this.con = Mysql();
  }
  read(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM columnas where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getAllData(data) {
    return new Promise((resolve, reject) => { //resolve y reject esta sin uso 
      let sqlPath = path.resolve(__dirname, 'getAllData.sql'); //sqlPath sin uso
    });
  }
  getFromProcess(data) {
    return new Promise((resolve, reject) => {
      let sqlPath = path.resolve(__dirname, 'SelectAll.sql');
      let sql = fs.readFileSync(sqlPath, 'UTF-8');
      this.con.query(sql, [data.id], (error, result, fields) => {
        if (error) throw error;
        //    if (result.length <= 0) throw 'No se encontraron registros';
        resolve({ status: 200, result: result });
      });
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `INSERT INTO columnas(
            nombre, 
            fk_tipo, 
            orden, 
            fk_responsable, 
            fk_estatus, 
            es_obligatorio, 
            descripcion, 
            fk_proceso
          ) 
          VALUES(?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          data.nombre,
          data.fk_tipo,
          data.orden,
          data.fk_responsable,
          data.fk_estatus,
          data.es_obligatorio,
          data.descripcion,
          data.fk_proceso
        ],
        (error, result, fields) => {
          if (error) throw error;
          //if (result.length <= 0) throw 'No se encontraron registros';
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  update(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `UPDATE columnas SET nombre= ?, 
            fk_tipo = ?, 
            orden=?, 
            fk_responsable=?, 
            fk_estatus=?, 
            es_obligatorio=?, 
            descripcion=?, 
            fk_proceso=? 
          WHERE id = ?`,
        [
          data.nombre,
          data.fk_tipo,
          data.orden,
          data.fk_responsable,
          data.fk_estatus,
          data.es_obligatorio,
          data.descripcion,
          data.fk_proceso,
          data.id
        ],
        (error, result, fields) => {
          if (error) throw error;
          console.log(error, 'error')
          resolve({status: 200, message: 'Valor actualizado correctamente' });
        }
      );
    });
  }
  updateNombre(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        `UPDATE columnas SET nombre = ? WHERE id = ?`,
        [data.name, data.id],
        (error, results, fields) => {
          if (error) throw error;
          resolve({status: 200, message: 'Valor actualizado correctamente' });
        }
      );
    });
  }
  delete(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'DELETE FROM columnas where id = ?',
        [data.id],
        (error, result, fields) => {
          if (error) throw error;
          // if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
}
