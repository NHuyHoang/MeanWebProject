const mongoose = require('mongoose');
const Products = require('../models/products/products');
const Estates = require('../models/products/estates');

module.exports = {
	createProduct: (input) => {
		let cateId = input.categoryid;
		if (cateId == 'estates') {
			return new Estates(input);
		}
		switch (input._type) {
			case '59ccb33a6b406109345ed119':
				return new Mobile(input);
			case '59ccb33a6b406109345ed118':
				return new Laptop(input);
			case '59ccb33a6b406109345ed117':
				return new Tablet(input);
			case '59ccb33a6b406109345ed116':
				return new Camera(input);
			case '59ce02c4dcc1ef295cad156c':
				return new Bycicle(input);
			case '59ce02c4dcc1ef295cad156b':
				return new Car(input);
			case '59ce02c4dcc1ef295cad156a':
				return new Motors(input);
			default:
				return new Products(input);
		}
	},

}
