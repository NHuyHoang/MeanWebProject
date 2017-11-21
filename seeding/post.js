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

const MAXPOST = 500;

const IMGTEMP = {
	'camera':[
		"https://storage.keepsnap.com/img/articles/5754f8bb2df1a.jpeg",
		"https://us.leica-camera.com/var/leica/storage/images/media/media-asset-management-mam/global-international/photography/m-system/leica-m-a-la-carte/teaser/leica-m-à-la-carte/1606741-2-eng-MA/LEICA-M-À-LA-CARTE_teaser-1200x470.jpg",
		"https://www.usa.canon.com/internet/wcm/connect/us/a0e58d8f-624a-400e-913a-00b3f0eb0f53/canon-eos-rebel-t5i-ef-s-18-55mm-is-stm-lens-3q-d.jpg?MOD=AJPERES&CACHEID=ROOTWORKSPACE.Z18_P1KGHJ01L85180AUEPQQJ53034-a0e58d8f-624a-400e-913a-00b3f0eb0f53-kZnQo-M"
	],
	'laptop':[
		"https://cnet2.cbsistatic.com/img/hjo7_UY6ykIh_9cfttUZYaiF7V0=/770x433/2017/06/21/39c814c4-4909-43e8-aa0d-89eff3aced37/apple-macbook-12-inch-2017-01.jpg",
		"https://cdn1.macworld.co.uk/cmsdata/features/3605337/macbookair11_lifestyle_15_thumb800.jpg"
	],
	'mobile':[
		"https://cdn.tgdd.vn/Files/2017/09/13/1021094/apple-iphone-2017-20170912-11675_800x450.jpg",
		"http://2.bp.blogspot.com/-ibz6SAn-J5M/VPSBVFtwGBI/AAAAAAAAAqo/GQtwirpNa7A/s1600/Samsung-Galaxy-S6-Samsung-Galaxy-S6-Edge-1.jpg"
	],
	'tablet':[
		"https://cdn3.techadvisor.co.uk/cmsdata/features/3665364/ipad_2017_lifestyle01_thumb800.jpg",
		"https://cnet3.cbsistatic.com/img/m-4kIqf1304YWgiLJ6sZ-6FLSJ8=/770x433/2017/03/29/f46ffb73-949f-4b81-9bc8-0f3472b31905/apple-ipad-2017-16.jpg"
	],
	'bicycle':[
		"https://inhabitat.com/wp-content/blogs.dir/1/files/2015/12/Fortified-Bicycle-Invincible-Theft-Proof-Bike-8-889x675.jpg",
		"http://www.roxyhotelnyc.com/wp-content/uploads/sites/3/2013/11/Roxy-Bike.jpg"
	],
	'car':[
		"https://assets.mbusa.com/vcm/MB/DigitalAssets/Vehicles/ClassLanding/2017/CLA/Features/2017-CLA-CLASS-PAGE-004-CCF-D.jpg",
		"https://www.mercedes-benz.com/wp-content/uploads/sites/3/2017/08/000-mercedes-benz-vehicles-vision-mercedes-maybach-6-cabriolet-2560x1440-848x477.jpg"
	],
	'motor':[
		"https://uncrate.com/p/2016/10/ducati-supersport-1.jpg",
		"http://polaris.hs.llnwd.net/o40/vic/2017/img/motorcycles/my17-overview/360/empulse-tt-titanium-silver-havasu-red/angle-00.jpg",
	],
	'house':[
		"http://grafrica.com.ng/wp-content/uploads/2017/02/Top-Ten-Interior-Design-Firms-in-Nigeria.jpg",
		"https://assets.entrepreneur.com/content/3x2/1300/20160518173143-office-space.jpeg"
	],
	'office':[
		"http://intro.bnos.com/wp-content/uploads/2014/12/db-schenker.jpg",
		"https://physioinmotion.ca/wp-content/uploads/2015/05/The-Office-Rivington-Street-Office-Space-940x407-800x346.jpg"
	],
	'department':[
		"https://www.microsoft.com/australia/about/images/offices/microsoft-melbourne-office.jpg"
	]
};

(() => {	
	Post.find()
	.count()
	.then((count) => {
		if(count < MAXPOST)
		{
			let t = _.times(MAXPOST - count,() => createPost());
			Post.insertMany(t);
		};
	})
})();

function createPost(){
	let product =  _.times(_.random(1,4),()=>{
		return generateRandomProduct();
	})

	let cmt = createCommentsObj();
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
	let productType = _.random(0,1);
	let product;
}

function createComments(array){
	let cmtModels = mongoose.model('comment',Comments);
	let idUser = getId[_.random(0, getId.length - 1)];
	let cmt = new cmtModels({
		usercmt: mongoose.Types.ObjectId(idUser),
		date: new Date(),
		cmt: faker.lorem.sentences(),
		reply:array
	});
	return cmt;
}

function createCommentsObj(){
	let cmtCount = _.random(1,4);
	let cmtObj = _.times(cmtCount, () => {
		let reply = _.times(_.random(1,3),() => createComments());
		return createComments(reply);
	})
	return cmtObj;
}



function createCamera(){
	let iso = ["ISO 100", "ISO 200", "ISO 400", "ISO 800", "ISO 1600", "ISO 3200"];
	return Cameras({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),

		imglist: IMGTEMP.camera,
		iso: iso[_.random(0, iso.length - 1)],
		megapixel: _.random(10, 500) + " mgpx",
		fps:_.random(10,100),
		lens:faker.lorem.sentence(),
		shots:_.random(1000, 100000)
	})
}

function createLaptop(){
	let img = _.times(_.random(1,3),() => faker.image.image());
	return Laptops({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.laptop,

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
	let img = _.times(_.random(0,3),() => faker.image.image());
	return Mobiles({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.mobile,

		ram : faker.lorem.words(),
		memory : faker.lorem.words(),
		megapixel: _.random(10, 500) + " mgpx"
	})
}

function createTablet(){
	let img = _.times(_.random(0,3),() => faker.image.image());
	return Tablets({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.tablet,

		ram : faker.lorem.words(),
		memory : faker.lorem.words(),
		megapixel: _.random(10, 500) + " mgpx",
		simcard: faker.random.boolean(),
		scrresolution:  _.random(30,70) + " X " + _.random(100, 500)
	})
}

function createBicycle(){
	let img = _.times(_.random(0,3),() => faker.image.transport());
	let species = ['bmx','moutain bike','road bike','electric bike'];
	return Bicycles({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.bicycle,

		species:species[_.random(0, species.length-1)], 			 				//bmx moutain-bike road-bike electric-bike..
		yearbought:_.random(1970, 2017)
	})
}

function createCar(){
	let img = _.times(_.random(0,3),() => faker.image.transport());
	let species = ['Sedan','Suv','Hatchblack','Pick up', 'Minivan', 'Van couple', 'Convertibles'];
	let fuel = ['Gas', 'Diesel', 'Electric'];
	return Cars ({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.car,

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
	let img = _.times(_.random(0,3),() => faker.image.transport());
	let species = ['scooter','embaraye','gear'];
	let fuel = ['Gas', 'Diesel', 'Electric'];
	return Motors ({
		description:  faker.lorem.paragraphs(),
		productname: faker.lorem.sentence(),
		state: faker.lorem.word(),
		producer: faker.lorem.words(),
		cost: faker.random.number(),
		currency: chooseCurrency(),		
		guarantee:faker.lorem.words(),
		paymentmethod:faker.lorem.words(),
		imglist: IMGTEMP.motor,

		species:species[_.random(0, species.length-1)], // sedan suv hatchblack pick-up minivan van couple Convertibles			 							 				// sedan suv hatchblack pick-up minivan van couple Convertibles
		year_registered:_.random(1970, 2017),
		km_numbers:_.random(100,100000),
		lincense_number:faker.phone.phoneNumberFormat(),
		cylinder_capacity:_.random(1,5) + "L",					
	})
}

function createLeaseContact(){
	let lct = mongoose.model('leasecontract',LeaseContract)
	return lct ({
		deposit:_.random(1000,100000),
		cost:_.random(1000,100000),
		contractduration:_.random(1,10) + " year(s)",
		currency:chooseCurrency()
	})
}

function createSaleContract(){
	let sct = mongoose.model('salecontract',SaleContract)
	return sct ({
		land_certificate: faker.random.boolean(),
		ownership_certificate: faker.random.boolean(),
		cost:_.random(1000,100000),
		paymentmethod:faker.lorem.words(),
		currency:chooseCurrency()
	})
}

function createEstate(){
	let contract = {};
	let contract2 = {}
	let type = ['houses','departments','offices'];
	let random = _.random(0,2)
	switch (random) {
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
	if(random == 0) {
			return Estates({
			_type: type[_.random(0, type.length -1 )],
			description:  faker.lorem.paragraphs(),
			address: faker.address.streetAddress() + ", " + faker.address.state(),
			location:{	lat:faker.address.latitude(),
				log:faker.address.longitude()},							
			registeredowner:faker.random.boolean(),					//chính chủ
			area: _.random(10,500),
			state: faker.lorem.word(),
			furnitureinclue:faker.random.boolean(),											
			leasecontract: contract,
			imglist: IMGTEMP.house
		})
	};
	if(random == 1) {
			return Estates({
			_type: type[_.random(0, type.length -1 )],
			description:  faker.lorem.paragraphs(),
			address: faker.address.streetAddress() + ", " + faker.address.state(),
			location:{	lat:faker.address.latitude(),
				log:faker.address.longitude()},							
			registeredowner:faker.random.boolean(),					//chính chủ
			area: _.random(10,500),
			state: faker.lorem.word(),
			furnitureinclue:faker.random.boolean(),											
			salecontract: contract2,
			imglist: IMGTEMP.office
		})
	};
	if(random == 2) {
			return Estates({
			_type: type[_.random(0, type.length -1 )],
			description:  faker.lorem.paragraphs(),
			address: faker.address.streetAddress() + ", " + faker.address.state(),
			location:{	lat:faker.address.latitude(),
				log:faker.address.longitude()},							
			registeredowner:faker.random.boolean(),					//chính chủ
			area: _.random(10,500),
			state: faker.lorem.word(),
			furnitureinclue:faker.random.boolean(),											
			leasecontract: contract,
			salecontract: contract2,
			imglist: IMGTEMP.department
		})
	};
	
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