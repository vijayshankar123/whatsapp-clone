const express = require("express");
const app = express();
const whatsapp = require("./routes/whatsapp");
const config = require("config");
const path = require("path");

const mongoose = require("mongoose");
const connectDB = require("./config/db");

app.use(express.json({ extended: false }));

connectDB();
// mongoose.connect(config.get("MONGOURI"), {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true,
// });

app.use(whatsapp);

//serve static assets in production

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("app started on port", port);
});
