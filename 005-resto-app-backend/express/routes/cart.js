const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// http:localhost:8000/cart/
router.get("/", itemController.displayCart);

// http:localhost:8000/cart/id
router.get("/:id", itemController.displayCartById);

router.post("/:id", itemController.addToCart);

// for decrement button
router.put("/decrement/:id", itemController.decrementQty);

// for increment button
router.put("/increment/:id", itemController.incrementQty);

router.delete("/:id", itemController.removeFromCart);

module.exports = router;
