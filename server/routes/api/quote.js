const express = require("express");
const mongodb = require("mongodb");

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const quotes = await loadQuotesCollection();
  res.send(await quotes.find({}).toArray());
});

// POST

router.post("/", async (req, res) => {
  const quotes = await loadQuotesCollection();
  await quotes.insertOne({
    quote: req.body.text,
    whoSaid: req.body.whoSaid,
    createdAt: new Date()
  });

  res.status(201).send();
});

// DELETE
router.delete("/:id", async (req, res) => {
  const quotes = await loadQuotesCollection();
  await quotes.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
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
