const PostsService = require('../services/PostsService');
const _ = require('lodash');
const adVerify = require('./AdminVerify');

module.exports = {
	getAll: (req, res) => {
		if (!req.body.skip) res.json("invalid request");
		else {
			PostsService.getAll(Number.parseInt(req.body.skip))
				.then((data) => {
					res.send(data);
				})
		}
	},
	getById: (req, res) => {
		let id = req.body.id;
		if (!id) res.json("invalid id");
		else
			PostsService.getById(id)
				.then((data) => {
					res.send(data);
				})
	},
	getByCate: (req, res) => {
		let parentCateId = req.body.parentid;
		let childCateId = req.body.childid;
		if (!parentCateId) res.json("invalid category id");
		else
			PostsService.getByCate(parentCateId, childCateId)
				.populate('userpost')
				.then((data) => {
					res.send(data);
				})
	},
	getByContractType: (req, res) => {
		let contractid = req.body.contractid;
		let type = req.body.type;
		if (!contractid) res.json("invalid contract id");
		else
			PostsService.getByContractType(contractid, type)
				.populate('userpost')
				.then((data) => {
					res.send(data);
				})
	},
	getByArea: (req, res) => {
		let areaid = req.body.areaid;
		let subid = req.body.subid;
		if (!areaid && !subid) res.json("invalid request");
		else
			PostsService.getByArea(areaid, subid)
				//.populate('userpost')
				.then((data) => {
					res.send(data)//;
				})
	},
	getByUserId: (req, res) => {
		let id = req.body.id;
		let skip = req.body.skip;
		if (!id) res.json("invalid request");
		else
			PostsService.getByUserId(id, skip)
				.then((data) => { res.send(data) })
	},
	update: (req, res) => {
		let info = req.body.info;
		let id = req.body.id;
		if (!id || !info) res.json("invalid request");
		else
			PostsService.update(id, info).then(data => {
				res.send(data)
			})
	},
	pushComment: (req, res) => {
		let cmt = req.body;
		if (cmt._id === undefined) res.send({ success: false });
		else
			PostsService.pushComment(cmt).then(data => {
				res.send({ success: true, data: data.comment[data.comment.length - 1] })
			}).catch(err => res.send({ success: false, message: err }))
	},
	pushReply: (req, res) => {
		let reply = req.body;
		if (reply._postid === undefined) res.send({ success: false });
		else
			PostsService.pushReply(reply).then(data => {
				PostsService.getById(data._id)
					.then(data => {
						let comment = data.comment;
						_.forEach(comment, (element) => {
							if (element._id == reply._cmtid) {
								res.send({ success: true, data: element.reply[element.reply.length - 1] });
								return;
							}
						})
					})
			}).catch(err => res.send(err))
	},
	getMinMaxCost:(req,res)=>{
		PostsService.getMinMaxCost().then(data => res.send(data));
	},
	getWithFilter:(req,res)=>{
		if(!req.body) res.send({"success":false});
		else{
			PostsService.getWithFilter(req.body).then(data => res.send(data))
		}
	},
	getVipPost:(req,res)=>{
		PostsService.getVipPost(req.body).then(data=>res.send(data));
	},
	getPostCountByUserId:(req,res) => {
		PostsService.getPostCountByUserId(req.body.id).then(data => {
			res.send(data)
		});
	},
	save:(req,res)=>{
		if(!req.body) res.send({message:"invalid request"});
		else{
			PostsService.save(req.body).then(result => {
				res.send({ _id:result._id });
			})
		}
	},
	adminGetAll:(req,res)=>{
		if(!req.body) res.send({message:"invalid request"});
		else{
			adVerify.verify(req)
				.then(result => {
						PostsService.adminGetAll(req.body).then(data => {
							res.send(data);
						})
					
				}).catch(err => res.sendStatus(404).send('Unauthorized'));
		}
	},
	adminUnapprovedCount:(req,res)=>{
		adVerify.verify(req)
				.then(result => {
						PostsService.adminUnapprovedCount().then(data => {
							res.send({count:data});
						})
				}).catch(err => res.sendStatus(404).send('Unauthorized'));
	},
	adminApprovePost:(req,res)=>{
		if(!req.body) res.send({message:"invalid request"});
		adVerify.verify(req)
				.then(result => {
						PostsService.adminApprovePost(req.body).then(data => {
							res.send(data);
						}).catch(err => res.send(err));
				}).catch(err => res.sendStatus(404).send('Unauthorized'));
	},
	activateVip:(req,res)=>{
		if(!req.body) res.send({message:"invalid request"});
		PostsService.activateVip(req.body)
			.then(data => {
				if(data.nModified == 1)
					res.send({success:true});
				else res.send({success:false});
			});
	}

}