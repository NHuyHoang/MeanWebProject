const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const productSchema = new Schema({
	description:  { type: String, required: true, unique: true},
	product_name: { type: String, required: true },
	state: { type: String, required: true },
	producer: { type: String, required: true },
	cost: { type: Number, required: true },
	currency: { type: String, required: true },
	categoryid:{ type: Schema.Types.ObjectId, require: true},
	guarantee:String,
	payment_method:{ type: String, required: true},
	sold:{type:Boolean},
	imglist: []
}, {collection : 'products',discriminatorKey : '_type'});

module.exports = mongoose.model('product', productSchema);