const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const PostsController = require('../controller/PostsController');
//User
let prefix = '/user/';
router.post(`${prefix}`, UsersController.getById)
	  .delete(`${prefix}remove`, UsersController.remove)
	  .get(`${prefix}getall`, UsersController.getAll)
	  .post(`${prefix}getbyemail`, UsersController.getByEmail)
	  .post(`${prefix}save`, UsersController.save)
	  .post(`${prefix}update`,UsersController.update);
//post
prefix = '/post/';
router.get(`${prefix}getall`,PostsController.getAll)
	  .post(`${prefix}getbyid`,PostsController.getById)
	  .post(`${prefix}getbycate`,PostsController.getByCate)
	  .post(`${prefix}getbyctrtype`,PostsController.getByContractType)
	  .post(`${prefix}getbyarea`,PostsController.getByArea)
	  .post(`${prefix}update`,PostsController.update);
module.exports = router;