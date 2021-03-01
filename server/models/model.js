var connection = require("./db");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = {

  // get all products
  getAllProducts: (callback) => {
    var queryStr = "SELECT * FROM products ORDER BY productId DESC ";
    connection.query(queryStr, function (err, result) {
      callback(err, result);
    });
  },


  // Adding items to the menu
  addItems: (data, callback) => {
    if (data[4])
      var queryStr = "Insert into products (productName, productPrice, description, category, image) values (?,?,?,?,?)";
    else
      var queryStr = "Insert into products (productName, productPrice, description, category) values (?,?,?,?)";
    connection.query(queryStr, data, function (err, result) {
      callback(err, result);
    });
  },

  // Get all Orders
  getOrders: (callback) => {
    var queryStr = " SELECT  orders.*, user.* FROM orders  INNER JOIN user ON  orders.userID = user.userId ";
    connection.query(queryStr, function (err, result) {
      callback(err, result);
    });
  },


  // To get the order status 
  action: (data, callback) => {
    var queryStr = `UPDATE orders SET status = '${data.status}' WHERE  orderId = '${data.orderId}'`
    connection.query(queryStr, function (err, result) {
      callback(err, result);
    });
  },

  // Get data for statistics on home page
  dashboard: async (callback) => {
    var obj = {}
    // Get rhe total earning
    var queryStr1 = "SELECT COUNT(*) FROM Orders";
    connection.query(queryStr1, function (err, result) {
      obj.orders = result

      // Get the canceled orders number
      var queryStr2 = "SELECT COUNT(*) FROM Orders WHERE status = 'Canceled'";
      connection.query(queryStr2, function (err, result2) {
        obj.canceled = result2

        // Get the Accepted orders number
        var queryStr3 = "SELECT SUM(totalAmount) FROM orders WHERE status ='Accepted'";
        connection.query(queryStr3, function (err, result3) {
          obj.earning = result3

          //Get AVG orders per week
          var queryStr = `SELECT COUNT(*), DAY(orderDate), MONTH(orderDate), YEAR(orderDate) FROM orders GROUP BY YEAR(orderDate), MONTH(orderDate), DAY(orderDate) ORDER BY orderId ASC LIMIT 10`;
          connection.query(queryStr, function (err, result4) {
            obj.day = result4

            //Get AVG orders per month
            var queryStr = `SELECT COUNT(*),MONTH(orderDate), YEAR(orderDate) FROM orders GROUP BY YEAR(orderDate), MONTH(orderDate) ORDER BY orderId ASC LIMIT 12`;
            connection.query(queryStr, function (err, result5) {
              obj.month = result5
              callback(err, obj);
            })
          })
        })
      });
    })
  },

  // Get the details for each product
  getOneItem: (data, callback) => {
    var queryStr = ` SELECT * FROM products WHERE productId = '${id}'`;
    connection.query(queryStr, function (err, result) {
      callback(err, result);
    });
  },

  // To update the products
  editItem: (id, data, callback) => {
    if (data[4])
      var queryStr = `UPDATE products SET productName =?, productPrice =?, description =?, category =?, image =? WHERE  productId =${id}`;
    else
      var queryStr = `UPDATE products SET productName =?, productPrice =?, description =?, category =? WHERE  productId = ${id}`;

    connection.query(queryStr, data, function (err, result) {
      callback(err, result);
    });
  },

  // To delete the products
  deleteItem: (id, callback) => {
    var queryStr = `DELETE FROM products WHERE  productId = ${id}`;
    connection.query(queryStr, function (err, result) {
      var queryStr = "SELECT * FROM products ORDER BY productId DESC";

      connection.query(queryStr, function (err, result1) {
        callback(err, result1);
      });
    });
  },

  // To login to system
  signin: (data, callback) => {
    var queryStr = `SELECT * FROM user WHERE email = '${data.email}'`;
    connection.query(queryStr, (err, result) => {
      if (result.length > 0) {
        if (data.password === result[0].password) {
          var id = result[0].id
          const token = jwt.sign({ id }, process.env.SECRET_TOKEN);
          callback(err, { auth: true, token: token, result: result });

        };
      }
    });
  }


};

