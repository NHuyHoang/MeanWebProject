const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;
const subcategorySchema = new Schema({
	_id : {type: Number, require:true, unique:true},
	name: {type: String,require: true},
	post:
	[{
		subpost:
		{
			type: Schema.Types.ObjectId,
			ref: 'post'
		}
	}]
	
});

module.exports = subcategorySchema;