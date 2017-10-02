const express = require('express');
const app = express();
const mongoose = require('mongoose');
const uri = 'mongodb://localhost:27017/meanWebDB_1';
const router = express.Router();
const fetchdata = require('./routes/fetchdata')(router);
const bodyParser = require('body-parser');
const seeding = require('./seeding/post');
const fetch = require('./routes/fetch');


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
app.use('/fetch',fetch);

app.listen(3000, () => {
	console.log('listening on port 3000');
});

let MobileSchema = require ('./models/products/electronics/mobile');
let mobile = new MobileSchema({
	description:  "des",
	productname: "productname",
	state: "new",
	producer: "producer",
	cost: 5000,
	currency: "USD",
	categoryid:"elt",
	guarantee:"3years",
	paymentmethod:"VISA",
	memory: "16gb",
	ram: "2gb",
	megapixel: "12mgpx",
	abcd:"123" // document khong hop le
});
console.log(mobile);