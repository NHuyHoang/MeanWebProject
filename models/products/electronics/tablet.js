const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const tabletSchema = product.discriminator('tablet',
	new mongoose.Schema({
		memory: String,
		ram: String,
		megapixel: String,
		guarantee: Boolean,
		simcard: Boolean,
		scrresolution: String,
		subcategoryid:{type:'String',default:'electronics'}
	}));

module.exports = tabletShema;