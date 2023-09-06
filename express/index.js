const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cartRouter = require("./routes/cart");
const menuRouter = require("./routes/menu");

app.use(cors());

app.get("/", (request, response) => {
	response.send("Hello from the server side!");
});

app.get("/greeting", (request, response) => {
	response.json("Hello!");
});

app.use("/cart", cartRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
	console.log(`Express server running on port ${port}`);
});
