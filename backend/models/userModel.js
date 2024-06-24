const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//we can make our own method on model like signup
//static signup method
userSchema.statics.signup = async function (email, password) {
  // write function else {this} keyword won't work

  //validation
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  const exists = await this.findOne({ email }); // when we create static like this instead of using model name use {this}

  if (exists) {
    throw Error("Email already in use");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  //hash password using bcrypt(salt added at end of password)
  const salt = await bcrypt.genSalt(10); //10 is number of rounds
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  const user = await this.findOne({ email }); // when we create static like this instead of using model name use {this}

  if (!user) {
    throw Error("No account exists");
  }

  const match = await bcrypt.compare(password, user.password);
  //returns true if match
  if (!match) {
    throw Error("Incorrect login credentials");
  }
  return user;
};

//export
module.exports = mongoose.model("User", userSchema);

//json web token
//client ---{signup}---> server ---{jwt}---> client [using this jwt frontend knows current logged in user]

//jwt = header(contains algo use fro jwt,etc) + payload(user data) + signature(used to verify token by the server)
