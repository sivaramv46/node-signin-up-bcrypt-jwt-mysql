const sql = require('mysql');

const mysqlconfig = require('../constants/constants')


  const mysql = sql.createConnection({
    host: mysqlconfig.MYSQL_HOST,
    user: mysqlconfig.MYSQL_USER,
    password: mysqlconfig.MYSQL_PASSWORD,
    database: mysqlconfig.MYSQL_DB
  });


  module.exports = mysql;
 