const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const areaSchema = new Schema({
	name: {type: String,require: true}
});

module.exports = areaSchema;