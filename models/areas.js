const mongoose = require('mongoose');
const SubAreas = require('./subareas');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;
const areaSchema = new Schema({
	_id:{ type: String, required: true, unique: true, lowercase: true },
	name: { type: String, required: true },
	subareas:[SubAreas]
});

module.exports = mongoose.model('area',areaSchema);
