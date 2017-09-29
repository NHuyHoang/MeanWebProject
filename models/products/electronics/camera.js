const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const cameraSchema = product.discriminator('camera',
	new mongoose.Schema({
		iso: String,
		megapixel: String,
		fps:Number,
		lens:String,
		shots:Number,
		subcategoryid:{type:'String',default:'electronics'}
	}));

module.exports = cameraSchema;