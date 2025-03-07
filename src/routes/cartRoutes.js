const express = require("express");
const cartController = require('../controllers/cartController');
const authenticateUser  = require('../middlewares/authMiddleware');

const router = express.Router();

router
    .get("/", authenticateUser, cartController.getCart)
    .post("/add", authenticateUser, cartController.addToCart)
    .delete("/remove", authenticateUser, cartController.removeFromCart)
    .delete("/clear", authenticateUser, cartController.clearCart);


module.exports = router;