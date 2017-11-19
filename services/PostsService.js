const mongoose = require('mongoose');
const Post = require('../models/posts');
const ProductsSv = require('./ProductsService');
const CateSv = require('./CategoriesService');
const AreaSv = require('./AreasService');
const objId = mongoose.Types.ObjectId;
const _ = require('lodash');

module.exports = {
	getAll: () => {
		return Post.find({},(err,data) => {
			if(err) throw err;
			return data;
		})
	},

	getById: (id) => {
		return Post.findOne({_id:id},(err, data) => {
			if(err) throw err;
			return data;
		})
	},

	getByCate: (parentid, childid) => {
		if(childid === undefined)
			return Post.find({"product.categoryid":parentid}, (err,data) => {
				if(err) throw err;
				return data;
			});
		else
			return Post.find({"product.categoryid":parentid,"product._type":childid}, (err,data) => {
				if(err) throw err;
				return data;
			});
	},
	//getbycontract use for estate only
	//find estate by contract type and estate type
	getByContractType: (contractid,type) =>{
		if(type === undefined)
			return Post.find({ 
				$or:[
				{"product.leasecontract.typecontract":objId(contractid)},
				{"product.salecontract.typecontract":objId(contractid)}
				]},
				(err,data) => {
					if(err) throw err;
					return data;
			});
		else
			return Post.find({ $and:[{ 
				$or:[
				{"product.leasecontract.typecontract":objId(contractid)},
				{"product.salecontract.typecontract":objId(contractid)}
				]},{"product._type":type}]},
				(err,data) => {
					if(err) throw err;
					return data;
				})
	},

	getByArea:(areaid, subid) => {
		if(areaid && subid === undefined){
			return AreaSv.getById(areaid)
				.then(data => {
					let area = [];
					data.subareas.forEach(entry => {
						area.push(entry._id);
					});
					return area;
				})
				.then(data => {
					return Post.find({subareaid:{$in:data}})
						.populate('userpost')
						.then(data => data)
						.catch(reject => reject);
				});
		}
		else if(subid && areaid === undefined){
			return Post.find({"subareaid":subid})
				.populate('userpost')
				.then(data => data)
				.catch(reject => reject);
		}
	},

	getByUserId:(id) =>{
		return Post.find({"userpost":id}).sort({"date":-1})
			.then(data => data)
			.catch(reject => reject);
	},

	save: (input) => {
		let post = new Post(input);
		post.product.push(ProductsSv.createProduct(input.product));
		return post.save((err) => {
			if(err) throw err;
		})
	},

	update: (id, input) => {
		return Post.findOneAndUpdate({_id:id}, input, (err, data) => {
			if(err) throw err;
			return data;
		})
	},

	remove: (id)=> {
		return Post.findByIdAndRemove({_id:id}, (err) => {
			if(err) throw err
		})
	},

	removeMany: (id) => {
		return Post.remove({_id: {$in: id}}, (err) => {
			if(err) throw err
		});
	}
}
