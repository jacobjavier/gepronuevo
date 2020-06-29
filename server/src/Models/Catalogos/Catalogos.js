import Mysql from './../Mysql';
import fs from 'fs';
import path from 'path';
export default class Columna {
  constructor() {
    this.con = Mysql();
  }
  getUsersCatalog(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM werax.w_usuarios',
        (error, result, fields) => {
          if (error) throw error;
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getStatusCatalog() {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM catalogo_estatus',
        (error, result, fields) => {
          if (error) throw error;
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  getDataTypes() {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM catalogo_tipo_dato',
        (error, result, fields) => {
          if (error) throw error;
          else console.log ('no pudimos dar con el tipo de dato');
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve({ status: 200, result: result });
        }
      );
    });
  }
  getDateTypesCatalog(data) {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM catalogo_tipo_fechas',
        (error, result, fields) => {
          if (error) throw error;
          //   if (result.length <= 0) throw 'No se encontraron registros';
          resolve(result);
        }
      );
    });
  }
  getResponsibleTypes() {
    return new Promise((resolve, reject) => {
      this.con.query(
        'SELECT * FROM catalogo_tipo_responsable',
        (error, result) => {
          if (error)
            reject({
              status: 500,
              error: error,
              message: 'Error al consultar en la base de datos'
            });
          resolve(result);
        }
      );
    });
  }
}
