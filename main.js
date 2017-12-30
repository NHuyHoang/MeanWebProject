const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressJwt = require('express-jwt');

const config =require('./config.json');
const router = express.Router();
//const fetchdata = require('./routes/fetchdata')(router);
const bodyParser = require('body-parser');
const seeding = require('./seeding/post');
const fetch = require('./routes/fetch');

const UnAuthenPath = [ /\/fetch\/user/i,/\/fetch\/post/i,/\/fetch\/area/i,/\/fetch\/cate/i,/\/fetch\/google/i ]
//allow which url can access
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:4200');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


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
app.use(expressJwt({
    secret: config.secret,
    getToken: function (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
			//console.log(req.headers.authorization.split(' ')[1]);	
            return req.headers.authorization.split(' ')[1];
        }
        return null;
	}
}).unless({ path: UnAuthenPath }));

app.use('/fetch', fetch);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
