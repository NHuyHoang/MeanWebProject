const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const prefix = '/user/';
//User
router.get(`${prefix}getall`, UsersController.getAll)
	  .post(`${prefix}getbyemail`, UsersController.getByEmail)
	  .post(`${prefix}getbyid`, UsersController.getById)
	  .post(`${prefix}save`,UsersController.save)
	  .post(`${prefix}update`,UsersController.update);
module.exports = router;