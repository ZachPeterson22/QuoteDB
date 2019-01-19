const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const quotes = require("./routes/api/quote");

app.use("/api/quotes", quotes);

const port = process.env.port || 5000;

app.listen(port, () => console.log(`server started on port ${port}`));
