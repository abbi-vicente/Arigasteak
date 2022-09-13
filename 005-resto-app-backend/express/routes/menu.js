const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");

// http:localhost:8000/menu
router.get("/", itemController.displayItems);

// http:localhost:8000/menu/id
router.get("/:id", itemController.displayById);

router.post("/", itemController.addNewItem);

router.put("/:id", itemController.editItems);

router.delete("/:id", itemController.deleteItems);

module.exports = router;
