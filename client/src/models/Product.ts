export class Product{
    _id:string;
    _type:string;
    description:string;
    product_name:string;
    state:string;
    producer:string;
    cost:number;
    currency:string;
    categoryid:string;
    guarantee:string;
    payment_method:string;
    sold:string;
    imglist:string[];
    constructor(input:any){
        this._id = input._id;
        this._type = input._type;
        this.description = input.description;
        this.product_name = input.product_name;
        this.state = input.state;
        this.producer = input.producer;
        this.cost = input.cost;
        this.currency = input.currency;
        this.categoryid = input.categoryid;
        this.guarantee = input.guarantee;
        this.payment_method = input.payment_method;
        this.imglist = input.imglist;
        this.sold =  input.sold;
    }
}