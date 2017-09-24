const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email:{ type: String, required: true },
  name: { type: String, required: true },
  pass: { type: String, required: true },
  img: String,
  point: Number
  
});

module.exports = mongoose.model('user', userSchema);