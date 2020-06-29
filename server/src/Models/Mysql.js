var mysql = require('mysql');
export default function Mysql() {
  return mysql.createPool({
    connectionLimit: 1000,
    host: '192.168.6.13',
    user: 'admini',
    password: '3mm4nu3lX',
    database: 'copro'
    // database: 'gepro'
  });
}
