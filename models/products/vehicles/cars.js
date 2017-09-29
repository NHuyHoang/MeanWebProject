const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../products');

const carSchema = Product.discriminator('59ce02c4dcc1ef295cad156b',
	new Schema({
		species:String, 			 				// sedan suv hatchblack pick-up minivan van couple Convertibles
		year_registered:Number,
		km_numbers:Number,
		lincense_number:String,
		gearbox:String,								//hộp số
		fuel:String,
		origin:String,								//xuất xứ			
		slots:Number,
		cylinder_capacity:String,		
		categoryid:{type:String,default:'vhc'}
	}));

module.exports = carSchema;

