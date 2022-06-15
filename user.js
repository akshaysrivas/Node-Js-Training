const mongoose = require('mongoose');
const userSchema= mongoose.Schema({
    username: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

module.exports= mongoose.model("users",userSchema);