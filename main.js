const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/meanWebDB_1';
const router = express.Router();
const fetchdata = require('./routes/fetchdata')(router);
const bodyParser = require('body-parser');

const estate = require('./models/products/estates');
const leaseCtr = require('./models/products/estatecontracts/leasecontract');

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
app.use('/fetchdata',fetchdata);

app.listen(3000, () => {
	console.log('listening on port 3000');
});