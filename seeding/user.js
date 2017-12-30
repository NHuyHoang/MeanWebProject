const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/users');
const _ = require ('lodash');
const bcrypt = require('bcryptjs');

const NUMBERTOINSERT = 150;

(() => {

	const arr = _.times(NUMBERTOINSERT,() => createUser());
	User.insertMany(arr).catch(reject => reject);

})();

function createUser(){
	return {
		email : faker.internet.email(),
		name : faker.name.findName(),
		pass : 'A'+faker.internet.password()+'1@',
		img : faker.image.avatar(),
		point : _.random(0,5)
	}
} 

/* (()=>{
	User.find({},{_id:1,pass:1}).then(user => {
		user.forEach(u => {
			User.update({_id:u._id},{ $set: { pass: bcrypt.hashSync(u.pass, 10)} },(err,result) => {
				console.log(result);
			});
		})
	});
})() */
