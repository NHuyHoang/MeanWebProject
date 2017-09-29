const faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/users');
const _ = require ('lodash');
const getId = require('./userid');
const getArea = require('./areaid');

const Comments = require('../models/comments');
const Post = require('../models/posts');

const Products = require('../models/products/products');
const Estates = require('../models/products/estates');

const Mobiles = require('../models/products/electronics/mobile');
const Laptops = require('../models/products/electronics/laptop');
const Cameras = require('../models/products/electronics/camera');
const Tablets = require('../models/products/electronics/tablet');

const Bicycles = require('../models/products/vehicles/bicycle');
const Cars = require('../models/products/vehicles/cars');
const Motors = require('../models/products/vehicles/motors');

const LeaseContract = require('../models/products/estatecontracts/leasecontract');
const SaleContract = require('../models/products/estatecontracts/salecontract');

const CURRENCY = ['USD', 'JPY', 'CNY', 'EUR'];

var MAXPOST = 20;

(() => {	
	Post.find()
	.count()
	.then((count) => {
		if(count < MAXPOST)
		{
			var t = _.times(MAXPOST - count,() => createPost());
			Post.insertMany(t);
		};
	})
})();

function createPost(){
	var product = generateRandomProduct();
	var cmt = createCommentsObj();
	return Post({
		userpost: mongoose.Types.ObjectId(getId[_.random(0, getId.length - 1)]),
		subareaid: mongoose.Types.ObjectId(getArea[_.random(0, getId.length - 1)]),
		title : faker.lorem.sentences(),
		date : faker.date.past(),
		vipexpire : faker.date.future(),
		available : faker.random.boolean(),
		approval : faker.random.boolean(),
		product: product,
		comment: cmt				
	})

}

function chooseCurrency(){
	return CURRENCY[_.random(0, CURRENCY.length - 1)]
}

function createProduct(){
	var productType = _.random(0,1);
	var product;
}

function createComments(array){
	var cmtModels = mongoose.model('comment',Comments);
	var idUser = getId[_.random(0, getId.length - 1)];
	var cmt = new cmtModels({
		usercmt: mongoose.Types.ObjectId(idUser),
		date: new Date(),
		cmt: faker.lorem.sentences(),
		reply:array
	});
	return cmt;
}

function createCommentsObj(){
	var cmtCount = _.random(1,4);
	var cmtObj = _.times(cmtCount, () => {
		var reply = _.times(_.random(1,3),() => createComments());
		return createComments(reply);
	})
	return cmtObj;
}



function createCamera(){
	var iso = ["ISO 100", "ISO 200", "ISO 400", "ISO 800", "ISO 1600", "ISO 3200"];
	return Cameras({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),

		imglist: [],
		iso: iso[_.random(0, iso.length - 1)],
		megapixel: _.random(10, 500) + " mgpx",
		fps:_.random(10,100),
		lens:faker.lorem.sentence(),
		shots:_.random(1000, 100000)
	})
}

function createLaptop(){
	var img = _.times(_.random(1,3),() => faker.image.image());
	return Laptops({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		chip : faker.lorem.words(),
		ram : faker.lorem.words(),
		memory : faker.lorem.words(),
		SSD : faker.lorem.words(),
		VGA : faker.lorem.words(),
		scrresolution : _.random(300,700) + " X " + _.random(1000, 5000),
		HDD : faker.lorem.words()
	})
}

function createMobile(){
	var img = _.times(_.random(0,3),() => faker.image.image());
	return Mobiles({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		ram : faker.lorem.words(),
		memory : faker.lorem.words(),
		megapixel: _.random(10, 500) + " mgpx"
	})
}

function createTablet(){
	var img = _.times(_.random(0,3),() => faker.image.image());
	return Tablets({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		ram : faker.lorem.words(),
		memory : faker.lorem.words(),
		megapixel: _.random(10, 500) + " mgpx",
		simcard: faker.random.boolean(),
		scrresolution:  _.random(30,70) + " X " + _.random(100, 500)
	})
}

function createBicycle(){
	var img = _.times(_.random(0,3),() => faker.image.transport());
	var species = ['bmx','moutain bike','road bike','electric bike'];
	return Bicycles({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		species:species[_.random(0, species.length-1)], 			 				//bmx moutain-bike road-bike electric-bike..
		yearbought:_.random(1970, 2017)
	})
}

function createCar(){
	var img = _.times(_.random(0,3),() => faker.image.transport());
	var species = ['Sedan','Suv','Hatchblack','Pick up', 'Minivan', 'Van couple', 'Convertibles'];
	var fuel = ['Gas', 'Diesel', 'Electric'];
	return Cars ({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		species:species[_.random(0, species.length-1)], // sedan suv hatchblack pick-up minivan van couple Convertibles			 							 				// sedan suv hatchblack pick-up minivan van couple Convertibles
		year_registered:_.random(1970, 2017),
		km_numbers:_.random(100,100000),
		lincense_number:faker.phone.phoneNumberFormat(),
		gearbox:faker.lorem.words(),								//hộp số
		fuel:fuel[_.random(0,fuel.length - 1)],
		cylinder_capacity:_.random(1,5) + "L",		
		origin:faker.lorem.words(),									//xuất xứ
		slots:_.random(0,12)
	})
}

function createMotor(){
	var img = _.times(_.random(0,3),() => faker.image.transport());
	var species = ['scooter','embaraye','gear'];
	var fuel = ['Gas', 'Diesel', 'Electric'];
	return Motors ({
		description:  faker.lorem.sentences(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: img,

		species:species[_.random(0, species.length-1)], // sedan suv hatchblack pick-up minivan van couple Convertibles			 							 				// sedan suv hatchblack pick-up minivan van couple Convertibles
		year_registered:_.random(1970, 2017),
		km_numbers:_.random(100,100000),
		lincense_number:faker.phone.phoneNumberFormat(),
		cylinder_capacity:_.random(1,5) + "L",					
	})
}

function createLeaseContact(){
	var lct = mongoose.model('leasecontract',LeaseContract)
	return lct ({
		deposit:_.random(1000,100000),
		cost:_.random(1000,100000),
		contractduration:_.random(1,10) + " year(s)",
		currency:chooseCurrency()
	})
}

function createSaleContract(){
	var sct = mongoose.model('salecontract',SaleContract)
	return sct ({
		land_certificate: faker.random.boolean(),
		ownership_certificate: faker.random.boolean(),
		cost:_.random(1000,100000),
		paymentmethod:faker.lorem.words(),
		currency:chooseCurrency()
	})
}

function createEstate(){
	var contract = {};
	var contract2 = {}
	var type = ['houses','departments','offices'];
	switch (_.random(0,2)) {
		case 0:
		contract = createLeaseContact();
		break;
		case 1:
		contract2 = createSaleContract();
		break;
		case 2:
		contract = createLeaseContact();
		contract2 = createSaleContract();
		break;

	}


	return Estates({
		_type: type[_.random(0, type.length -1 )],
		description:  faker.lorem.sentences(),
		address: faker.address.streetAddress() + ", " + faker.address.state(),
		location:{	lat:faker.address.latitude(),
			log:faker.address.longitude()},							
		registeredowner:faker.random.boolean(),					//chính chủ
		area: _.random(10,500),
		state: faker.lorem.word(),
		furnitureinclue:faker.random.boolean(),											
		leasecontract: contract,
		salecontract: contract2,
		imglist: []
	})
}

function generateRandomProduct(){
	switch (_.random(0,1)) {
		case 0:
		return products = (() => {
			switch (_.random(0,5)) {
				case 0:
				return createCamera();
				case 1:
				return createLaptop();
				case 2:
				return createMobile();
				case 3:
				return createTablet();
				case 4:
				return createBicycle();
				case 5:
				return createCar();
				case 6:
				return createMotor();
			}
		})()
		case 1:
		return createEstate();
	}
}