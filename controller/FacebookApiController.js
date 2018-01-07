var passport = require('passport');
const FacebookStrategy = require('passport-facebook');
const UserServices = require('../services/UsersService');
const User = require('../models/users');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const query = require('querystring');
const secret = require('../credential/client_secret_oauth.json');
module.exports = {
    passportInit:()=>{
       
        passport.use(new FacebookStrategy({
            clientID: secret.facebook.client_id,
            clientSecret: secret.facebook.client_secret,
            callbackURL: "/fetch/facebook/oauth/redirect",
            profileFields: ['id', 'displayName', 'picture.type(large)', 'email']
          },
          function(accessToken, refreshToken, profile, done) {
            console.log(profile);
            let userObj = profile._json;
            UserServices.getByEmail(userObj.email).then(user => done(null,user))
                .catch(() => {
                    let user = new User({
                        email:userObj.email,
                        name:userObj.name,
                        img:userObj.picture.data.url,
                        pass:"AuthenticatebyFacebookOauthv2.11",
                        point:0
                    })
                    //console.log(user);
                    user.save()
                        .then(result => done(null,result));
                });
            //done(null,profile)
          }
        ));
    },
    fbAuthenticated:(req,res) => {
        let id = req.user._id;
        let user = _.omit(req.user,"_id");
        let token = jwt.sign({ sub: id }, config.secret);
        
        let qstring = query.stringify(user);
        qstring = qstring.concat("&_id=" + id + "&token=" + token);
        
        res.redirect('http://localhost:4200/oauth?' + qstring);
        res.end();
    },
}