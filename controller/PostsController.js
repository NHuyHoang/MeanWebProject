const PostsService = require('../services/PostsService');

module.exports = {
	getAll: (req, res) => {
		PostsService.getAll()
		.populate('userpost')
		.then((data) => {
			res.send(data);
		})
	},
	getById: (req, res) => {
		let id = req.body.id;
		if(!id) res.json("invalid id");
		else
			PostsService.getById(id)
			.then((data) => {
				res.send(data);
			})
	},
	getByCate: (req, res) => {
		let parentCateId = req.body.parentid;
		let childCateId = req.body.childid;
		if(!parentCateId) res.json("invalid category id");
		else
			PostsService.getByCate(parentCateId,childCateId)
			.populate('userpost')
			.then((data) => {
				res.send(data);
			})
	},
	getByContractType: (req, res) => {
		let contractid = req.body.contractid;
		let type = req.body.type;
		if(!contractid) res.json("invalid contract id");
		else
			PostsService.getByContractType(contractid,type)
			.populate('userpost')
			.then((data) => {
				res.send(data);
			})
	},
	getByArea: (req, res) => {
		let areaid = req.body.areaid;
		let subid = req.body.subid;
		if(!areaid && !subid) res.json("invalid request");
		else 
			PostsService.getByArea(areaid,subid)
			//.populate('userpost')
			.then((data) => {
				res.send(data)//;
			})
	},
	getByUserId:(req,res) => {
		let id = req.body.id;
		let skip = req.body.skip;
		if(!id) res.json("invalid request");
		else
			PostsService.getByUserId(id,skip)
				.then((data) => { res.send(data)})
	},

	update: (req, res) => {
		let info = req.body.info;
		let id = req.body.id;
		if(!id || !info) res.json("invalid request");
		else
			PostsService.update(id,info).then(data => {
				res.send(data)
			})
	}
}