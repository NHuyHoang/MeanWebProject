const mongoose = require('mongoose');
const user = require('../models/users');
const comments = require('../models/comments');
const post = require('../models/posts');
const categories = require('../models/categories');
const product = require('../models/products/products');
const Mobile = require('../models/products/electronics/mobile');
const Areas = require('../models/areas');

module.exports = (router) =>{
	router.post('/getuser',(req,res) => {
		if(!req.body.email){
			res.json({success:false, message:'please provide user email'})
		}else{
			email = req.body.email;
			user.findOne({email:email},(err, data) => {
				if(err) throw new err;
				res.send(data);
			})
		}
		
	});
	router.get('/getallusers',(req,res) => {
		user.find({},(err, data) => {
			if(err) throw new err;
			res.send(data);
		})
	});


	router.get('/getallpost',(req, res) => {
		var populateQuery =
		[
		{path:'userpost', select:['name','email','img']},
		{path:'comment.usercmt', select:['name','email','img']}
		];
		post.find({})
		.populate(populateQuery)
		.exec((err, data) => {
			if (err) return handleError(err);
			res.send(data)
		});

	});

	router.get('/getallcate',(req, res) => {
		categories.find({})
		.populate('subcategory.post.subpost')
		.exec((err, data) => {
			if (err) return handleError(err);
			res.send(data)
		});

	});

	router.post('/getcategory',(req, res) => {
		if(!req.body.id){
			res.json({success:false, message:'please provide category id'})
		}else{
			id = req.body.id;
			categories
			.findOne({_id:id})
			.populate('subcategory.post.subpost')
			.exec((err, data) => {
				if (err) return handleError(err);
				res.send(data)
			});
		}
	});

	
	//insert user
	router.post('/insertuser',(req, res) => {
		if(!req.body)
			res.json({success:false, message:'invalid user'})
		else{
			var User = new user(req.body);
			User.save()
			.then((result) => {
				console.log(result);
				res.send(result);	
			})
		}
	})

	router.post('/deleteuser',(req, res) => {
		if(!req.body.email)
			res.json({success:false, message:'invalid user'})
		else{

			user.findOneAndRemove({email:req.body.email})
			.then(() => {
				user.find({},(err,data) => {
					if(err) throw err;
					else res.send(data);
				})
			})
		}
	})

	router.post('/insertmobile',(req, res) =>{
		var mobile = new Mobile({
			description:  "s128",
			productname: "s8",
			state: "atarashii",
			producer: "samsung",
			cost: "2000",
			currency: "USD",
			memory: "24gb",
			ram: "2gb",
			megapixel: "12mgpx"
		});

		mobile.save((err) => {if(err) throw err})
		.then((result) => {
			res.send(result)
		});
	})

	router.get('/findproduct',(req, res) => {
		product.find({},(err,data)=>{
			if(err) throw err;
			res.send(data);
		})
	})

	router.post('/insertcate',(req, res) =>{
		var a = new categories(req.body);
		a.save((err) => {
			if(err) throw err;
		}).then((data) => {
			res.send(data);
		})
	})

	router.post('/insertarea',(req, res) =>{
		var a = new Areas(req.body);
		a.save((err) => {
			if(err) throw err;
		}).then((data) => {
			res.send(data);
		})
	})

	return router;
}