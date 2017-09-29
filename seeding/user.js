const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/users');
const _ = require ('lodash');

const NUMBERTOINSERT = 30;

(() => {

	const arr = _.times(NUMBERTOINSERT,() => createUser());
	User.insertMany(arr,(err) =>{ 
		if(err) throw err;
	}).then((data) => {
		console.log(data);
	});

})();

function createUser(){
	return {
		email : faker.internet.email(),
		name : faker.name.findName(),
		pass : faker.internet.password(),
		img : faker.image.avatar(),
		point : _.random(0,5)
	}
}
