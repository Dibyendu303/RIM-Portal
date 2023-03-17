const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
// const cookieParser = require("cookie-parser");
const itemRouter = require("./routes/itemRoutes.js");
const requestRouter = require("./routes/requestRoutes.js");
const mongoose = require("mongoose");
const URI =
	`mongodb+srv://cc-rim-portal:yFKI00xcm00W4qPT@cluster0.ipm9jh9.mongodb.net/?retryWrites=true&w=majority`;
app.use(bodyParser.json());

const port = 8080;
mongoose
	.connect(URI)
	.then((result) => {
		console.log("connected");
		console.log(`Auth server listening on port ${port}`);
		app.listen(port);
	})
	.catch((err) => {
		console.log(err);
	});
// app.use(cookieParser);
app.use("/item", itemRouter);
app.use("/request", requestRouter);



