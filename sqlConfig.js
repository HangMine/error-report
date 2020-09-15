//连接数据库
const mysql = require("promise-mysql");
const pool = mysql.createPool({
  host: 'localhost', //本地
  password: 'root',//本地
  // host: '138.128.211.146',
  // password: '',
  user: 'root',

  database: 'blog',
  connectionLimit: 10
});

module.exports = pool;