const UsersService = require('../services/UsersService');

module.exports = {
	getAll:(req, res) => {
		UsersService.getAll().then((data) => {
			res.send(data);
		})
	},
	getByEmail:(req, res) => {
		if(!req.body.email) res.json({message:"invalid email"});
		else UsersService.getByEmail(req.body.email).then((data) => {
			res.send(data);
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
	}
}