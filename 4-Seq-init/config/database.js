const { Sequelize } = require('sequelize');

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DBUSERNAME,
  process.env.PASSWORD,  
{
  host: 'localhost',
  dialect: 'mysql'       /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});
module.exports = sequelize;
