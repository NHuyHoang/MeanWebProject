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
	}
	/*getParentId:(childId) => {
		return Area.find({},(err, data) => {
			if(err) throw err;
			return data;
		})
			.then(data => {
				let result;
				data.forEach(parent => {
					let check = false;
					parent.subareas.forEach(child => {
						if(child._id == childId){
							check = true;
							
						};
						console.log(child.name);
					});
					if(check) {
						result = parent.subareas;
						console.log(result);
						throw new Error();
					}
				});
				return result
			})
	}*/
}



