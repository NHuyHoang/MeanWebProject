const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


var laptopSchema = product.discriminator('59ccb33a6b406109345ed118',
	new mongoose.Schema({
        chip : String,
        ram : String,
        memory : String,
        SSD : String,
        VGA : String,
        screen_solution : String,
        HDD : String,
        categoryid:{type:String,default:'elt'}
	}));
module.exports = laptopSchema;