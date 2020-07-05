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
  "mongodb+srv://hot9998:" +
    mongoosePW.mongoosePW +
    "@cluster0-gcuoo.mongodb.net/test?retryWrites=true&w=majority",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: String,
  username: String,
  password: String,
  admin: { type: Boolean, default: false },
});

type userType = {
  id: string;
  username: string;
  password: string;
};

userSchema.statics.create = function (user: userType) {
  const createUser = new this({
    user,
  });
  return createUser.save();
};

userSchema.statics.findOne = function (username: string) {
  return this.findOne({
    username,
  }).exec();
};

module.exports = mongoose.model("User", userSchema);
