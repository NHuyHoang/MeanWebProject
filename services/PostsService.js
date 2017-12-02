const mongoose = require('mongoose');
const Post = require('../models/posts');
const ProductsSv = require('./ProductsService');
const CateSv = require('./CategoriesService');
const AreaSv = require('./AreasService');
const objId = mongoose.Types.ObjectId;
const _ = require('lodash');
const CommentSchema = require('../models/comments');

module.exports = {
	getAll: (skip) => {
		return Post.find({})
			.populate(['userpost','comment.usercmt'])
			.sort({"date":-1}).limit(10).skip(skip)
			.then(data => data)
			.catch(reject => reject)
	},

	getById: (id) => {
		return Post.findOne({_id:id})
			.populate(['userpost','comment.usercmt'])
			.then(data => data)
			.catch(reject => reject)
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

	getByUserId:(id,skip) =>{
		let find =  Post.find({"userpost":id})
			.sort({"date":-1}).limit(5).skip(parseInt(skip))
			.then(data => data)
			.catch(reject => reject);
		let count = Post.count({"userpost":id},(err,count) => count);

		return Promise.all([find,count])
			.then(values => {
				values[0].push({'postcount':values[1]});
				return values[0];
			})
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
	},

	pushComment: (cmt) =>{
		let cmtModel = mongoose.model('comment',CommentSchema);
		let holder = new cmtModel({
			usercmt: objId(cmt.userpost),
			date: cmt.date,
			cmt: cmt.cmt,
			reply:[]
		})
		return Post.findOneAndUpdate({_id:cmt._id},{$push:{comment:holder}}).then(data => {
			if(!data) return {success:false};
			else{
				
				return Post.findOne({_id:data._id},(err,data)=>{
					if(err) return {success:false};
					else return data;
				})
			}
		});
	},
	pushReply:(reply)=>{
		let cmtModel = mongoose.model('comment',CommentSchema);
		let holder = new cmtModel({
			usercmt: objId(reply.usercmt),
			date: reply.date,
			cmt: reply.cmt,
			reply:[]
		})
		return Post.findOneAndUpdate(
			{
				"_id":reply._postid,
				"comment._id":reply._cmtid
			},
			{
				$push:{"comment.$.reply":holder}
			}
		)
	}
}
