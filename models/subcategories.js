const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
const subcategorySchema = new Schema({
	name: {type: String,require: true},
	subcategory:[]
});

module.exports = subcategorySchema;