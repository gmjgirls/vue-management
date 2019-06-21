/* 连接数据库的模块 */

// 1.引入mysql
const mysql = require('mysql')

// 2.创建连接对象
const connection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database:"demo"
})

// 3.执行连接方法 
connection.connect()
console.log('数据库连接成功')

//暴露连接对象
module.exports = connection;