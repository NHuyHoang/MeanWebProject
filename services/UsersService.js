const mongoose = require('mongoose');
const User = require('../models/users');

module.exports = {
	//get all user
	getAll: () => {
		return User.find({},(err,data) => {
			if(err) throw err;
			return data;
		})
	},
	//find user by email
	getByEmail: (email) => {
		return User.findOne({email:email},(err, data) =>{
			if(err) throw err;
			return data;
		})
	},
	getByEmailPass: (email,pass) => {
		return User.findOne({email:email,pass:pass},(err, data) =>{
			if(err) throw err;
			return data;
		})
	},
	//find user by id
	getById: (id) => {
		return User.findOne({_id:id}).select({ _id:1, email:1, name:1, img:1})
	},
	//save user
	save: (info) => {
		let user = new User(info);
		return user.save((data) => data)
					.catch(reject => reject);
	},
	//update user
	update: (id, info) => {
		return User.findOneAndUpdate({_id:id}, info, { runValidators: true })
				.then(data => data)
				.catch(reject => reject);
	},
	//remove many
	removeMany: (id) => {
		return User.remove({_id: {$in: id}}, (err) => {
			if(err) throw err
		});
	},
	//find id and remove
	remove: (id) => {
		return User.findByIdAndRemove({_id:id}, (err, doc) => {
			if(err) throw err;
			doc.remove();//trigger the pre remove -> delete all post
		});
	}
}
