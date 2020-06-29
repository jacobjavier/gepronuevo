import Mysql from './../Mysql';
export default class Login {
  constructor() {
    this.conn = Mysql();
  }
  checkUser(user, pass) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT u.id, u.usuario, u.email, a.es_admin , departamento FROM werax.w_usuarios u
      LEFT JOIN copro.administrador_usuario a ON a.fk_usuario = u.id
      WHERE u.usuario = ?
        AND u.password2 = ?`;
      this.conn.query(sql, [user, pass], (error, results, fields) => {
        if (error) throw error;
        if (results.length === 0)
          resolve( {status: 401, errors: ['Datos invalidos'] });
        else
          resolve({status: 200, response: results, errors: [] });
      });
    });
  }
}
