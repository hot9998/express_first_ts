var mongoose = require("mongoose");
const mongoosePW = require("../config/userinfo.json");

let db = mongoose.connection;

db.on("error", function () {
  console.log("Connection Failed!");
});

db.once("open", function () {
  console.log("Connected to mongod server");
});

mongoose.connect(
  "mongodb://root:kmov1234@localhost:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
