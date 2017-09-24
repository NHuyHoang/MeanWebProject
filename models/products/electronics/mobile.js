const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const mobileSchema = new Schema({
  description:  { type: Schema.Types.ObjectId, required: true, unique: true},
  productname: { type: String, required: true },
  state: { type: String, required: true },
  producer: { type: String, required: true },
  memory: String,
  ram: String,
  megapixel: String,
  cost: { type: Number, required: true },
  currency: { type: String, required: true },
  
});

module.exports = mongoose.model('mobile', mobileSchema);