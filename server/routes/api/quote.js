const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// admin name - neur0
// admin pwd - tallest123

// mongodb://<dbuser>:<dbpassword>@ds153815.mlab.com:53815/quote_generator

// GET
router.get("/", async (req, res) => {
  const quotes = await loadQuotesCollection();
  res.send(await quotes.find({}).toArray());
});

// POST

router.post("/", async (req, res) => {
  const quotes = await loadQuotesCollection();
  await quotes.insertOne({
    quote: req.body.quote,
    createdAt: new Date()
  });

  res.status(201).send();
});

// DELETE
router.delete("/:id", async (req, res) => {
  const quotes = await loadQuotesCollection();
  await quotes.deleteOne({ _id: new mondodb.ObjectID(req.params.id) });
  res.status(200).send();
});

async function loadQuotesCollection() {
  const client = await mongodb.MongoClient.connect(
    "mongodb://abc123:abc123@ds153815.mlab.com:53815/quote_generator",
    { useNewUrlParser: true }
  );

  return client.db("quote_generator").collection("quotes");
}

module.exports = router;
