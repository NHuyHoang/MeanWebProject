const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

let emailValidation = {
	validator: (value) => {
		const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return emailRegEx.test(value);
	},
	message:'invalid email'
};

let passValidation = {
	validator: (value) => {
		const passRegEx =
			//1 lowercase / 1 upercase / 1 number / 1 special char / longer than 8 char
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
			return passRegEx.test(value); 	
	},
	message:'password must have first upercase char, 1 number, 1 special char and longer than 8 chars'
};

const userSchema = new Schema({
	email:{
		type: String,
		required: [true, 'email is required'],
		validate:emailValidation
	},
	name: { 
		type: String, 
		required: [true, 'name is required']
	},
	pass: {
		type: String, 
		required: [true, 'pass is required'],
		validate:passValidation
	},
	img: String,
	point: Number
});

module.exports = mongoose.model('user', userSchema);