const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
const saleSchema = new Schema({
	typecontract:{ type:Schema.Types.ObjectId, default:"59ccbd9d0946c325f89056de"},
	land_certificate: Boolean,
	ownership_certificate: Boolean,
	cost:{ type:Number, require:true },
	paymentmethod:String,
	currency:String
},{ _id : false });

module.exports = saleSchema;