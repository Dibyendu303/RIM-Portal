const express= require("express");
const itemRouter = express.Router();
const {download, addItem, listAllItems} = require("../controllers/item.js");
itemRouter.route("/")
    .post(addItem)
    .get(listAllItems);
itemRouter.get("/download", download);
module.exports = itemRouter;