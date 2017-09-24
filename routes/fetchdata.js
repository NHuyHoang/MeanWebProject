const mongoose = require('mongoose');
const user = require('../models/users');
const comments = require('../models/comments');
const post = require('../models/posts');
const categories = require('../models/categories');


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
		/**/

	});


	return router;
}