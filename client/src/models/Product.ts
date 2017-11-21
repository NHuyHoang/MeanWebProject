export class Product{
    _id:string;
    _type:string;
    description:string;
    productname:string;
    state:string;
    producer:string;
    cost:number;
    currency:string;
    categoryid:string;
    guarantee:string;
    paymentmethod:string;
    imglist:string[];
    constructor(input:any){
        this._id = input._id;
        this._type = input._type;
        this.description = input.description;
        this.productname = input.productname;
        this.state = input.state;
        this.producer = input.producer;
        this.cost = input.cost;
        this.currency = input.currency;
        this.categoryid = input.categoryid;
        this.guarantee = input.guarantee;
        this.paymentmethod = input.paymentmethod;
        this.imglist = input.imglist;
    }
}