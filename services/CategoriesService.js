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
		return AllCategory.then(data => data);
	},

	getById: (id) =>{
		return Category.find({"subcategory._id":id},(err,data) => {
			if(err) throw err;
			return data;
		}).then((data)=>{
            data = data[0];
            let result = {
                _id:data._id,
                name:data.name,
                subcategory:{}
            }
            data.subcategory.forEach(element => {
                if(id == element._id)
                {
                    result.subcategory = element;
                    return;
                }
            })
            return result
        })
	}
}