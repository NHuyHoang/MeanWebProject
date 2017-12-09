const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const tabletSchema = product.discriminator('59ccb33a6b406109345ed117',
	new mongoose.Schema({
		memory: String,
		ram: String,
		megapixel: String,
		guarantee: Boolean,
		simcard: Boolean,
		screen_solution: String,
		categoryid:{type:String,default:'elt'}
	}));

module.exports = tabletSchema;