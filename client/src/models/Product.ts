export class Product {
    //_id: string;
    _type: string;
    description: string;
    product_name: string;
    state: string;
    producer: string;
    cost: number;
    currency: string;
    categoryid: string;
    guarantee: string;
    payment_method: string;
    sold: string;
    imglist: string[];
    constructor(input?: any) {
        if (input === undefined) {
            //this._id = "";
            this._type = "";
            this.description = "";
            this.product_name = "";
            this.state = "";
            this.producer = "";
            this.cost = 0;
            this.currency = "";
            this.categoryid = "";
            this.guarantee = "";
            this.payment_method = "";
            this.imglist = [];
            this.sold = "";
        }
        else {
            //this._id = input._id;
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
            this.sold = input.sold;
        }
    }
}