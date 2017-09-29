const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const mobileSchema = product.discriminator('mobile',
	new mongoose.Schema({
		memory: String,
		ram: String,
		megapixel: String,
		subcategoryid:{type:'String',default:'electronics'}
	}));

module.exports = mobileSchema;