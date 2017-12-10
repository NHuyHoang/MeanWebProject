const mongoose = require('mongoose');
const Area = require('../models/areas');

module.exports = {
	getAll:() => {
		return Area.find({},(err, data) => {
			if(err) throw err;
			return data;
		})
	},
	getById:(id) => {
		return Area.findOne({"_id":id},(err, data) => {
			if(err) throw err;
			return data;
		})
	},
	getChildArea:(id) => {
		return Area.find({"subareas._id":id},(err,data)=>{
			if(err) throw err;
			return data;
		}).then((data) => {
			data = data[0];
			let area = {
				_id:data._id,
				name:data.name,
				subarea:{}
			}
			data.subareas.forEach(element => {
				if(element._id == id){
					area.subarea = element;
					return;
				}		
			});
			return area;
		})
	}
	
}



