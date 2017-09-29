const mongoose = require('mongoose');
const leasecontract = require('./estatecontracts/leasecontract');
const salescontract = require('./estatecontracts/salecontract');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const estateSchema = new Schema({
	_type: { type:String, require:true},
	description:  { type: String, required: true},
	address:{ type: String, required: true },
	location:{ type: Schema.Types.Mixed },								//{ lat : Number, log : Number }
	registeredowner:{ type:Boolean, required: true },					//chính chủ
	area:Number,
	state: { type: String, required: true },
	furnitureinclue:Boolean,											
	leasecontract: leasecontract,
	salecontract: salescontract,
	imglist: []
}, {collection : 'esates'});

module.exports = mongoose.model('estate', estateSchema);
