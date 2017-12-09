const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");	//cross-origin sharing standard

const uri = 'mongodb://localhost:27017/meanWebDB_1';
const router = express.Router();
const fetchdata = require('./routes/fetchdata')(router);
const bodyParser = require('body-parser');
const seeding = require('./seeding/post');
const fetch = require('./routes/fetch');
const corsOptions = {
	origin: 'http://127.0.0.1:4200',//allowed
	optionsSuccessStatus: 200
}



mongoose.Promise = global.Promise;
mongoose.connect(uri, { useMongoClient: true })
	.then(() => {
		console.log('Connected to db at ', uri);
		return mongoose.connection;
	})
	.catch(err => {
		console.log('Fail to connect ' + err);
	});	
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/fetchdata', fetchdata);
app.use('/fetch', fetch);

/* 
var request = require('request');
request('http://apilayer.net/api/live?access_key=206861fec801f01e3c4744465be21f3b&from=USD&to=GBP&amount=10',function (error, response, body){
	console.log(response.body);
}) */
seeding;
app.listen(3000, () => {
	console.log('listening on port 3000');
});
