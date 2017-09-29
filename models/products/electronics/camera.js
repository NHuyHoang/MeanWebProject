const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


const cameraSchema = product.discriminator('59ccb33a6b406109345ed116',
	new mongoose.Schema({
		iso: String,
		megapixel: String,
		fps:Number,
		lens:String,
		shots:Number,
		categoryid:{type:String,default:'elt'}
	}));

module.exports = cameraSchema;