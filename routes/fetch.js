const express = require('express');
const router = express.Router();
const UsersController = require('../controller/UsersController');
const PostsController = require('../controller/PostsController');
const AreasController = require('../controller/AreasController');
const CatesController = require('../controller/CatesController');
const UploadController = require('../controller/UploadController');
const GApiController = require('../controller/GoogleApiController');
const FbApiController = require('../controller/FacebookApiController');
const passport = require('passport');
GApiController.passportInit();
FbApiController.passportInit();

const expressJwt = require('express-jwt');

const config = require('../config.json');
function jwtExpress(){
	return expressJwt({
		secret: config.secret,
		getToken: function (req) {
			if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
				//console.log(req.headers.authorization.split(' ')[1]);	
				return req.headers.authorization.split(' ')[1];
			}
			return null;
		}
	})
}
//User
let prefix = '/user/';
router.post(`${prefix}`, UsersController.getById)
	  .delete(`${prefix}remove`,jwtExpress(), UsersController.remove)
	  .post(`${prefix}getall`,jwtExpress(), UsersController.getAll)
	  .post(`${prefix}getbyemail`, UsersController.getByEmail)
	  .post(`${prefix}getbyemailpass`, UsersController.getByEmailPass)
	  .post(`${prefix}save`, UsersController.save)
	  .post(`${prefix}update`,jwtExpress(),UsersController.update)
	  .get(`${prefix}verify`,UsersController.verify)
	  .get(`${prefix}count`,jwtExpress(),UsersController.countUser)
	  .get(`${prefix}oauth`,UsersController.oauth)
	  .post(`${prefix}getusersinfo`,UsersController.getManyUser);
//post
prefix = '/post/';
router.post(`${prefix}getall`,PostsController.getAll)
	  .post(`${prefix}getbyid`,PostsController.getById)
	  .post(`${prefix}getbycate`,PostsController.getByCate)
	  .post(`${prefix}getbyctrtype`,PostsController.getByContractType)
	  .post(`${prefix}getbyarea`,PostsController.getByArea)
	  .post(`${prefix}getbyuserid`,PostsController.getByUserId)
	  .post(`${prefix}update`,PostsController.update)
	  .post(`${prefix}pushcmt`,jwtExpress(),PostsController.pushComment)
	  .post(`${prefix}pushrep`,jwtExpress(),PostsController.pushReply)
	  .get(`${prefix}getminmaxcost`,PostsController.getMinMaxCost)
	  .post(`${prefix}getwithfilter`,PostsController.getWithFilter)
	  .post(`${prefix}getvippost`,PostsController.getVipPost)
	  .post(`${prefix}getpostcount`,PostsController.getPostCountByUserId)
	  .post(`${prefix}save`,jwtExpress(),PostsController.save)
	  .post(`${prefix}activevip`,jwtExpress(),PostsController.activateVip);
//Area
prefix = '/area/';
router.post(`${prefix}getchildarea`,AreasController.getChildArea)
	  .get(`${prefix}getall`,AreasController.getAll);
//Cate
prefix = '/cate/';
router.post(`${prefix}getbyid`,CatesController.getById);
//Upload
prefix = '/google/';
router.post(`${prefix}drive/upload`,GApiController.GUpload)
	  .post(`${prefix}drive/remove`,GApiController.GFileRemove)
	  .get(`${prefix}oauth`, passport.authenticate('google', { scope: ['email', 'profile'] }))
	  .get(`${prefix}oauth/redirect`,passport.authenticate('google'),GApiController.googleAuthenticated);
prefix = '/facebook/';  
router.get(`${prefix}oauth`,passport.authenticate('facebook',{ scope: ['email'] }))
	  .get(`${prefix}oauth/redirect`,
	  passport.authenticate('facebook'),FbApiController.fbAuthenticated);;

//private
prefix = '/private/';
router.post(`${prefix}post/getall`,jwtExpress(),PostsController.adminGetAll)
	  .get(`${prefix}post/unapproved-count`,jwtExpress(),PostsController.adminUnapprovedCount)
	  .post(`${prefix}post/approve`,jwtExpress(),PostsController.adminApprovePost);
module.exports = router;

