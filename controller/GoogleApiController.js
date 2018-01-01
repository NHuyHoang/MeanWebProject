
const Google = require('../services/GoogleService');
var multer = require('multer');
var fs = require('fs');
const DIR = './view';
const jwt = require('jsonwebtoken');
//google authentication
var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const client_secret = require('../credential/client_secret_oauth.json')

const User = require('../models/users');
const UserServices = require('../services/UsersService')
const mongoose = require('mongoose');
const query = require('querystring');
const _ = require('lodash');
const config = require('../config.json');

module.exports = {
    GUpload: (req, res) => {
        //after upload to local -> upload to drive
        LocalUpload(req, res)
            .then(files => {
                //upload to drive 
                //output id of files
                GDriveUpload(files)
                    .then(data => res.send({data:data}))
                    .catch(err => res.send(err));
            })
            .catch(err => res.send(err));
    },
    GFileRemove:(req, res) => {
        var idArray = req.body.data;
        GDriveRemove(idArray)
            .then(result => {
                res.send(result)})
            .catch(err => res.send(err));
    },
    passportInit:()=>{
        passport.serializeUser((user,done)=>{
            done(null,user._id)
        })

        passport.deserializeUser((_id,done)=>{
            UserServices.getById(_id)
                .then(user => done(null,user))
        })

        passport.use(new GoogleStrategy({
            callbackURL:'/fetch/google/oauth/redirect',
            clientID:client_secret.web.client_id,
            clientSecret:client_secret.web.client_secret
        },function (accessToken, refreshToken, profile, done) {
           //profile contains all the personal data returned 
            //find user in database
            let email = profile.emails[0].value;
            UserServices.getByEmail(email).then(user => done(null,user))
                .catch(() => {
                    let user = new User({
                        email:email,
                        name:profile.name.familyName+" "+profile.name.givenName,
                        img:profile.photos[0].value,
                        pass:"AuthenticatebyGoogle+v1",
                        point:0
                    })
                    user.save()
                        .then(result => done(null,result));
                });
        }))
    },
    googleAuthenticate:(req,res,next)=>{
        passport.authenticate('google', { scope: ['email', 'profile'] })(req, res, next);
    },
    googleAuthenticated:(req,res)=>{
        //res.send(req.user);
        //console.log(req.user);
        let id = req.user._id;
        let user = _.omit(req.user,"_id");
        let token = jwt.sign({ sub: id }, config.secret);
        
        let qstring = query.stringify(user);
        qstring = qstring.concat("&_id=" + id + "&token=" + token);
        //console.log(qstring);
        res.redirect('http://127.0.0.1:4200/oauth?' + qstring);
        res.end();
    },
    googleAuthenticated2:(req,res,next)=>{
        //passport.authenticate('google')(req, res, next);
        if(req.user !== undefined)
            res.send(req.user);
    },
    gplus:(req,res)=>{
        Google.gplus();
    }
}

function LocalUpload(req) {
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, DIR)
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
    });

    var upload = multer({ storage: storage }).any();

    return new Promise((resolve, reject) => {
        upload(req, null, function (err) {
            if (err) {
                reject(err.toString());
            }
            let result = [];
            req.files.forEach(element => {
                result.push(
                    {
                        name: element.filename,
                        path: element.path
                    }
                );
            });
            resolve(result);
        });
    });

}

function GDriveUpload(files) {
    //holder array
    var uploadedFiles = [];
    return new Promise((resolve, reject) => {
        //upload each file
        files.forEach(file => {
            let upload = Google.GUpload(file).then(result => {
                uploadedFiles.push(result);
                //end if uploaded all
                if (uploadedFiles.length == files.length) {
                    resolve(uploadedFiles);
                };
            }).catch(err => reject(err));

        })
    })
}

function GDriveRemove(idArray) {
    var removedFiles = 0;
    console.log(idArray);
    return new Promise((resolve, reject) => {
        idArray.forEach(id => {
            console.log(id);
            let remove = Google.GFileRemove(id).then(result => {
                removedFiles++;
                if(removedFiles == idArray.length)
                    resolve({success:true});
            }).catch(err => reject(err));
        })
    })
}
