const mongoose = require("mongoose");
const config = require("config");
const Pusher = require("pusher");

const connectDB = async () => {
  try {
    await mongoose.connect(config.get("MONGOURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb has a connected");

    const db = mongoose.connection;

    db.once("open", () => {
      console.log("DB connected");
    });
    const msgCollection = db.collection("whatsapps");
    const changeStream = msgCollection.watch();

    changeStream.on("change", (change) => {
      console.log("A change", change);

      if (change.operationType === "insert") {
        const messageDetails = change.fullDocument;
        pusher.trigger("messages", "inserted", {
          name: messageDetails.name,
          message: messageDetails.message,
          received: messageDetails.received,
        });
      }
    });

    const pusher = new Pusher({
      appId: "1068905",
      key: "caeaea165257a4171eec",
      secret: "69e826f1bf3a09de7243",
      cluster: "ap2",
      encrypted: true,
    });
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
