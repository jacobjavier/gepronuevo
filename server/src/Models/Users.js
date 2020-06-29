import Mysql from './Mysql';
export default class Users {
  constructor() {
    this.pool = Mysql();
  }
  get() {
    return new Promise((resolve, reject) => {
      let sql = 'SELECT id,usuario FROM werax.w_usuarios ORDER BY usuario';
      this.pool.query(sql, (error, result, fields) => {
        if (error) throw error;
        if (result.length <= 0) throw 'No se encontraron registros';
        resolve({ status: 200, result: result });
      });
    });
  }
}
