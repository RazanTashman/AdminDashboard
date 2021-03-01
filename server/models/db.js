const mysql = require("mysql");

const connection = mysql.createPool({
  host: "us-cdbr-east-03.cleardb.com",
  user: "b9508812ad9c82",
  password: "6e028046",
  database: "heroku_586a31546d9a6f1",
});

connection.query("select 1 + 1", (err, rows) => {
  if (err) throw err;
  console.log("Connected! , hello");
});

module.exports = connection;
