const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/users');
const _ = require ('lodash');

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
