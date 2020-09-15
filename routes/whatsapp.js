const express = require("express");
const router = express.Router();
const Messages = require("../models/Whatsapp");

router.post("/api/messages/now", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) res.status(500).send(err);
    else res.status(201).send(data);
  });
});

router.get("/api/messages/now", (req, res) => {
  Messages.find((err, data) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(data);
  });
});

module.exports = router;
