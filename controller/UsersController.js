const UsersService = require('../services/UsersService');
const _ = require("lodash");
const config = require("../config.json");
let jwt = require("jsonwebtoken");
const adVerify = require('./AdminVerify')

module.exports = {
	getAll:(req, res) => {
		if(!req.body) res.send({message:"invalid request"})
		adVerify.verify(req)
			.then(() => {
				UsersService.getAll(req.body.skip).then((data) => {
					
					res.send(data);
				})
			})
			.catch(() => res.sendStatus(404).send("Unauthorized"));
	},
	countUser:(req,res) =>{
		return UsersService.countUser().then(count => res.send({count:count}));
	},
	getByEmail:(req, res) => {
		if(!req.body.email) res.json({message:"invalid email"});
		else UsersService.getByEmail(req.body.email).then((data) => {
			res.send(data);
		})
	},
	getByEmailPass:(req,res) => {
		if(!req.body.email || !req.body.pass) res.json({message:"invalid email or pass"});
		else UsersService.getByEmailPass(req.body.email,req.body.pass).then((data) => {
			if(!data || data.message === "not found") res.send({message:'not found'});
			if(data.admin && data.admin === true){
				data.token = jwt.sign({ sub: data._id,admin: true }, config.secret);
				res.send(_.omit(data,["pass"]));
			}
			else {
				data.token = jwt.sign({ sub: data._id }, config.secret)
				res.send(_.omit(data,"pass"));
			};
		})
	},
	getById:(req,res) => {
		const id = req.body.id;
		if(!id) res.json({message:"invalid id"});
		else UsersService.getById(id).then((data) => {
			res.send(data);
		})
	},
	save:(req,res) => {
		const user = req.body;
		if(!user) res.json({message:"invalid user"});
		else UsersService.save(user).then((data) => {
			res.send(data);
		})
	},
	update:(req,res) => {
		const id = req.body.id;
		const user = req.body.user;
		if(!id || !user) res.json({message:"invalid request"});
		else UsersService.update(id, user).then((data) => {
			res.send(data);
		});
	},
	remove:(req,res) => {
		const id = req.body.id;
		if(!id) res.json({message:"invalid id"});
		else UsersService.remove(id).then((data) => {
			res.send(data);
		})
	},
	verify:(req,res) => {
		adVerify.verify(req)
			.then(() => res.send({admin:true}))
			.catch(() => res.send({admin:false}));
	},
	oauth:(req,res) =>{
		let p = new Promise((resolve,reject)=>{
			if(req.user !== undefined)
				resolve(req.user);
		})
		p.then(user => res.send(user));
	},
	getManyUser:(req,res) => {
		if(!req.body || !req.body.idArr) res.send({message:"invalid request"});
		else UsersService.getManyUser(req.body.idArr)
				.then(result => res.send(result));
	}
}