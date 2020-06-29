import Mysql from './../Mysql';
import fs from 'fs';
import path from 'path';
// Modules
import ContenidoProcesoModel from './../ContenidoProceso/ContenidoProceso';
// Utilities
import QueryPromise from './../../Utilities/QueryPromise';
export default class Eventos {
  constructor() {
    this.pool = Mysql();
  }
  async transactionCreate(con, data, resolve, reject) {
    // Insert Eventos
    let insertEventos = await QueryPromise(
      con,
      'INSERT INTO eventos(fk_proceso, fk_estatus) Values (?,1)',
      [data.processId]
    );
    if (insertEventos.error) {
      return con.rollback(() => {
        reject(insertEventos.error);
      });
    }
    // Get Columns
    let queryGetColumns = `SELECT id,nombre,fk_tipo,orden,fk_responsable,
        fk_estatus,es_obligatorio,descripcion,
        fk_proceso FROM columnas 
      WHERE fk_proceso = ?
      ORDER BY orden ASC`;
    let getColumns = await QueryPromise(con, queryGetColumns, [data.processId]);
    if (getColumns.error) {
      return con.rollback(() => {
        reject(getColumns.error);
      });
    }
    let valuesContent = [];
    getColumns.result.map((row, idx) => {
      if (row['orden'] === 0) {
        valuesContent.push([
          insertEventos.result.insertId,
          row['id'],
          data.keyEvent
        ]);
      } else {
        valuesContent.push([insertEventos.result.insertId, row['id'], null]);
      }
    });
    if (valuesContent.length === 0) {
      return con.rollback(() => {
        reject('Error en la consulta de columnas');
      });
    }
    // Insert contenido_proceso
    let sqlInsertContenido = `INSERT INTO contenido_proceso 
        (fk_evento, fk_columna, contenido) 
      VALUES ?;`;
    let insertContenido = await QueryPromise(con, sqlInsertContenido, [
      valuesContent
    ]);
    if (insertContenido.error) {
      return con.rollback(() => {
        reject(insertContenido.error);
      });
    }
    // Commit
    con.commit(async err => {
      if (err) {
        return con.rollback(function() {
          reject(err);
        });
      }
      let contProcModel = new ContenidoProcesoModel();
      let contProc = await contProcModel.getFromEvent({
        id: insertEventos.result.insertId,
        userId: data.userId
      });
      resolve({
        status: 200,
        response: contProc
      });
    });
  }
  create(data) {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((connectionError, con) => {
        if (connectionError) reject(connectionError);
        con.beginTransaction(async transactionError => {
          if (transactionError) reject(transactionError);
          await this.transactionCreate(con, data, resolve, reject);
        });
      });
    });
  }
  updateStatus(data) {
    return new Promise(async (resolve, reject) => {
      try {
        let sql = 'UPDATE eventos SET fk_estatus = ? WHERE id = ?';
        let query = await QueryPromise(this.pool, sql, [data.status, data.id]);
        if (query.error) throw `Error al intentar actualizar: ${query.error}`;
        resolve({ status: 200, result: query.result, error: null });
      } catch (error) {
        reject({ status: 500, message: 'Error en el servidor', error: error });
      }
    });
  }
}
