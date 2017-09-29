const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('../products');

const bicycleSchema = Product.discriminator('59ce02c4dcc1ef295cad156c',
	new Schema({
		species:String, 			 				//bmx moutain-bike road-bike electric-bike..
		yearbought:Number,
		categoryid:{type:String,default:'vhc'}
	}));

module.exports = bicycleSchema;
