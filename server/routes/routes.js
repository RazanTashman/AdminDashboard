var router = require("express").Router();
var controller = require("../contollers/controllers");

// Get all data from products table
router.get("/items", controller.getAllProducts);

//Adding items to the menu
router.post("/addItems", controller.addItems);

// Get all Orders
router.get("/orders", controller.getOrders);

// To get the order status
router.post("/action", controller.action);

// Get data for statistics on home page
router.get("/home", controller.dashboard);

// To update the products
router.put("/items/:id", controller.editItem);

// To delete the products
router.delete("/items/:id", controller.deleteItem);

// To login to system
router.post("/signin",  controller.signin);


module.exports.router = router;
