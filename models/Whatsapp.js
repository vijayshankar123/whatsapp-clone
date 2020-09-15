const mongoose = require("mongoose");

const WhatsappSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  name: String,
  timestamp: String,
  received: Boolean,
});

module.exports = mongoose.model("whatsapp", WhatsappSchema);
