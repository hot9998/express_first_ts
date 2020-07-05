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
  admin: { type: Boolean, default: false },
});

type userType = {
  username: string;
  password: string;
};

userSchema.statics.create = function (user: userType) {
  const createUser = new this({
    ...user,
  });
};

userSchema.statics.findOne = function (username: string) {
  return this.findOne({
    username,
  }).exec();
};

module.exports = mongoose.model("User", userSchema);
