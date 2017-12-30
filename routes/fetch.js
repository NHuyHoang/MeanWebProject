const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const PostsController = require('../controller/PostsController');
const AreasController = require('../controller/AreasController');
const CatesController = require('../controller/CatesController');
const UploadController = require('../controller/UploadController');
const GApiController = require('../controller/GoogleApiController');
//User
let prefix = '/user/';
router.post(`${prefix}`, UsersController.getById)
	  .delete(`${prefix}remove`, UsersController.remove)
	  .get(`${prefix}getall`, UsersController.getAll)
	  .post(`${prefix}getbyemail`, UsersController.getByEmail)
	  .post(`${prefix}getbyemailpass`, UsersController.getByEmailPass)
	  .post(`${prefix}save`, UsersController.save)
	  .post(`${prefix}update`,UsersController.update);
//post
prefix = '/post/';
router.post(`${prefix}getall`,PostsController.getAll)
	  .post(`${prefix}getbyid`,PostsController.getById)
	  .post(`${prefix}getbycate`,PostsController.getByCate)
	  .post(`${prefix}getbyctrtype`,PostsController.getByContractType)
	  .post(`${prefix}getbyarea`,PostsController.getByArea)
	  .post(`${prefix}getbyuserid`,PostsController.getByUserId)
	  .post(`${prefix}update`,PostsController.update)
	  .post(`${prefix}pushcmt`,PostsController.pushComment)
	  .post(`${prefix}pushrep`,PostsController.pushReply)
	  .get(`${prefix}getminmaxcost`,PostsController.getMinMaxCost)
	  .post(`${prefix}getwithfilter`,PostsController.getWithFilter)
	  .post(`${prefix}getvippost`,PostsController.getVipPost)
	  .post(`${prefix}getpostcount`,PostsController.getPostCountByUserId)
	  .post(`${prefix}save`,PostsController.save);
//Area
prefix = '/area/';
router.post(`${prefix}getchildarea`,AreasController.getChildArea);
router.get(`${prefix}getall`,AreasController.getAll);
//Cate
prefix = '/cate/';
router.post(`${prefix}getbyid`,CatesController.getById);
//Upload
prefix = '/google/';
router.post(`${prefix}drive/upload`,GApiController.GUpload)
router.post(`${prefix}drive/remove`,GApiController.GFileRemove);
//private
prefix = '/private/';
router.post(`${prefix}post/getall`,PostsController.adminGetAll);

module.exports = router;