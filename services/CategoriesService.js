const mongoose = require('mongoose');
const Category = require('../models/categories');

const AllCategory = 
	Category.find({},(err,data) => {
		if(err) throw err;
		return data;
	}).then(data => {
		let productsCate = [];
		let estatesCate = [];
		data.forEach((entry)=>
		{
			if(entry._id == 'est') 
				estatesCate.push(entry);
			else productsCate.push(entry);
		}
		);
		return { products:productsCate , estates:estatesCate };
	});

module.exports = {
	getAll: () => {
		return AllCategory;
	},

	getProductCateById: (id) =>{
		return Category.find({_id:id},(err, data) => {
			if(err) throw err;
		})
	}
}