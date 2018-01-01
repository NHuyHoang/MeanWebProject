const mongoose = require('mongoose');
const User = require('../models/users');
const Post = require('../models/posts');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

module.exports = {
	//get all user
	getAll: (skip) => {
		let promise1 = 
			User.find({},{email:1,name:1,img:1,point:1}).limit(20).skip(skip).lean();
		return Promise.all([promise1])
				.then(values => {
					let result = [];
					return new Promise((res,rej)=>{
						values[0].forEach(user =>{
							Post.find({userpost:user._id}).count().then(c =>{
								let holder = user;
								holder.postCount = c;
								result.push(holder);
								//console.log(result);
								if(result.length == values[0].length){
									res(result);
								} 
							})
						})
					})
				})		
	},
	countUser:()=>{
		return User.find({}).count();
	},
	//find user by email
	getByEmail: (email) => {
		return new Promise((res,rej)=>{
			User.findOne({email:email},{email:1,_id:1,img:1,point:1,name:1}).lean()
			.then(data => {
				if(data === null) rej();
				else res(data);
			})
		})
	},
	getByEmailPass: (email,pass) => {
		return User.findOne({email:email}).lean().then(user => {
			if(!user) return user;
			if(bcrypt.compareSync(pass,user.pass))
				return user;
			else return {message:"not found"}
		})
		//return User.findOne({email:email,pass:pass}).lean();
	},
	//find user by id
	getById: (id) => {
		return User.findOne({_id:id}).select({ _id:1, email:1, name:1, img:1, point:1})
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
