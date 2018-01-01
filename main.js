const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');
const passtport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const path = require('path');

const config = require('./config.json');
const router = express.Router();
//const fetchdata = require('./routes/fetchdata')(router);
const bodyParser = require('body-parser');
const seeding = require('./seeding/post');
const fetch = require('./routes/fetch');

//const UnAuthenPath = [ new RegExp('/fetch/user/oauth.*', 'i'),/\/fetch\/user/i, /\/fetch\/post/i, /\/fetch\/area/i, /\/fetch\/cate/i, new RegExp('/fetch/google.*', 'i'), /\/favicon.ico/]


let corsOption = {
    "origin": "http://127.0.0.1:4200",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders":'X-Requested-With,content-type,Authorization',
    "preflightContinue": true,
    'credentials':true
}

app.use(cors(corsOption));


mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true })
    .then(() => {
        console.log('Connected to db at ', config.db);
        return mongoose.connection;
    })
    .catch(err => {
        console.log('Fail to connect ' + err);
    });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// use JWT auth to secure the api, the token can be passed in the authorization header or querystring
/* app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            //console.log(req.headers.authorization.split(' ')[1]);	
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }
}).unless({ path: UnAuthenPath }));
 */
app.use(cookieSession({
    maxAge:24*60*60*1000,
    keys:[config.secret]
}));

app.use(passtport.initialize());
app.use(passtport.session());
app.use('/fetch', fetch);

/* app.use(express.static(__dirname+'/client/dist/'));
app.get('*  ',(req,res) => {
    res.sendFile(path.join(__dirname+'client/dist/index.html'))
}) */



app.listen(3000, () => {
    console.log('listening on port 3000');
});

