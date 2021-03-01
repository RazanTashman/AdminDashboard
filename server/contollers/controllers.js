var model = require("../models/model");

module.exports = {
  
  /// Get all data from products table
  getAllProducts: (req, res) => {
    model.getAllProducts(function (err, results) {
      if (err) {
        console.log("error in get products controller", err);
      }
      console.log("success in get products controller");
      res.json(results);
    });
  },

  //Adding items to the menu
   addItems: (req, res) => {
    var data = [req.body.productName, req.body.productPrice, req.body.description, req.body.category, req.body.image]
    model.addItems(data, function (err, results) {
     if (err) {
       console.log("error in adding items controller", err);
     }
     console.log("success in adding items controller");
     res.json(results);
    });
  },

  // Get all Orders
  getOrders: (req, res) => {
    model.getOrders(function (err, results) {
      if (err) {
        console.log("error in getting Orders controller", err);
      }
      console.log("success in getting Orders controller");
      res.json(results);
    });
  },

  // To get the order status 
  action: (req, res) => {
    var data = req.body
    model.action(data, function (err, results) {
     if (err) {
       console.log("error in adding items controller", err);
     }
     console.log("success in adding items controller");
     res.json(results);
    });
  },

  // Get data for statistics on home page
  dashboard:  async (req, res) => {
   await model.dashboard(function (err, results) {
      if (err) {
        console.log("error in dashboard controller", err);
      }
      console.log("success in dashboard get Orders controller");
      res.json(results);
    });
  },

  // Get the details for each product
  getOneItem: (req, res) => {
    var data = req.params.id
    model.getOneItem(data,function (err, results) {
      if (err) {
        console.log("error in get Orders controller", err);
      }
      console.log("success in get Orders controller");
      res.json(results);
    });
  },

  // To update the products
  editItem: (req, res) => {
    var data =  [req.body.productName, req.body.productPrice, req.body.description, req.body.category, req.body.image,parseInt(req.body.id)]
    model.editItem( req.params.id,data,function (err, results) {
      if (err) {
        console.log("error in update item controller", err);
      }
      console.log("success in update item controller");
      res.json(results);
    });
  },

  // To delete the products
  deleteItem: (req, res) => {
    var data = req.params.id
    model.deleteItem(data,function (err, results) {
      if (err) {
        console.log("error in get Orders controller", err);
      }
      console.log("success in get Orders controller");
      res.json(results);
    });
  },

  // To login to system
  signin: (req, res) => {
    var data = {
      email:req.body.email,
      password: req.body.password
    };
    model.signin(data,function (err, results) {
      if (err) {
        console.log("error in get Orders controller", err);
      }
      console.log("success in get Orders controller");
      res.json(results);
    });
  },
  
};


