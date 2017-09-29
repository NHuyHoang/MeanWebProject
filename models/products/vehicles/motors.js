const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../products');

const motorSchema = Product.discriminator('59ce02c4dcc1ef295cad156a',
	new Schema({
		species:String, 			 				//scooter //embaraye //gear
		year_registered:Number,
		km_numbers:Number,
		lincense_number:String,
		cylinder_capacity:Number,					//dung tích xy lanh
		categoryid:{type:String,default:'vhc'}
	}));

module.exports = motorSchema;


