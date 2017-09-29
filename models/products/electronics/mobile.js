const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const mobileSchema = product.discriminator('59ccb33a6b406109345ed119',
	new mongoose.Schema({
		memory: String,
		ram: String,
		megapixel: String,
		categoryid:{type:String,default:'elt'}
	}));

module.exports = mobileSchema;