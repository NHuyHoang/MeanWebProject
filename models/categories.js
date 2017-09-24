const mongoose = require('mongoose');
const subcategory = require('./subcategories');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const categorySchema = new Schema({
  _id:{ type: String, required: true, unique: true, lowercase: true},
  name: { type: String, required: true },
  subcategory:[subcategory]
  
});

module.exports = mongoose.model('category', categorySchema);