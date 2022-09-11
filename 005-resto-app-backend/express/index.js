const express = require("express");
const app = express();
const port = 8000;
// const {v4: uuidv4} = require("uuid");
const cors = require("cors");

// body-parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cartRouter = require("./routes/cart");
const menuRouter = require("./routes/menu");

app.use(
	cors({
		origin: "*",
	})
);

app.get("/", (request, response) => {
	response.send("Hello from the server side!");
});

app.use("/cart", cartRouter);
app.use("/menu", menuRouter);

app.listen(port, () => {
	console.log(`Express server running on port ${port}`);
});
