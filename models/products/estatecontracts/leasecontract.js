const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
const leaseSchema = new Schema({
	typecontract:{ type:Schema.Types.ObjectId, default:"59ccbd9d0946c325f89056df"},
	deposit:{ type:Number, require:true },
	cost:{ type:Number, require:true },
	contractduration:String,
	currency:String
});

module.exports = leaseSchema;
