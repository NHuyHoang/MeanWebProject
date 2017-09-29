const mongoose = require('mongoose');
const product = require('../products');
mongoose.Promise = global.Promise;


var laptopSchema = product.discriminator('laptop',
	new mongo.Schema({
        chip : String,
        ram : String,
        memory : String,
        SSD : String,
        VGA : String,
        scrresolution : String,
        HDD : String,
        subcategoryid:{type:'String',default:'electronics'}
	}));
module.exports = laptopSchema;