require('dotenv').config()
const express= require("express");
const jwt = require('jsonwebtoken');
const itemRouter = express.Router();
const {download, addItem, listAllItems, deleteItem} = require("../controllers/item.js");
const authenticateToken = require('../middleware/authToken.js');
const multer = require("multer");


//With authentication token
// itemRouter.route("/")
//     .post(authenticateToken, addItem)
//     .get(authenticateToken, listAllItems)
//     .delete(authenticateToken, deleteItem);

//Without token

// const app = express();
// app.use(cors());
// app.use(express.json());
const memoStorage = multer.memoryStorage();
const upload = multer({ memoStorage });
const filesUploader=upload.fields([{name:"bill"},{name:"sanctionLetter"}])
itemRouter.route("/")
    .post(filesUploader,addItem)
    .get(listAllItems)
    .delete(deleteItem);
itemRouter.get("/download", authenticateToken, download);
module.exports = itemRouter;

