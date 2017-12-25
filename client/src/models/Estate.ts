export class Estate {
    _id: string;
    _type: string;
    description: string;
    address: string;
    location: any;								//{ lat : Number, log : Number }
    registered_owner: boolean;					//chính chủ
    area: number
    state: string;
    furniture_include: boolean;
    leasecontract: any;
    salecontract: any;
    categoryid: string;
    sold: string;
    imglist: string[];
    constructor(input?: any) {
        if (input === undefined) {
            this._id = "";
            this._type = "";
            this.description = "";
            this.address = "";
            this.location = {
                'log': "",
                'lat': ""
            };							//{ lat  =  Number, log  =  Number }
            this.registered_owner = false;					//chính chủ
            this.area = 0;
            this.state = "";
            this.furniture_include = false;
            this.leasecontract = {
                typecontract: "",
                deposit: "",
                cost: "",
                contract_duration: "",
                currency: ""
            };
            this.salecontract = {
                typecontract: "",
                land_certificate: "",
                ownership_certificate: "",
                cost: "",
                payment_method: "",
                currency: ""
            };
            this.sold = "false";
            this.categoryid = "";
            this.imglist = [];
        } else {
            this._id = input._id;
            this._type = input._type;
            this.description = input.description;
            this.address = input.address;
            this.location = {
                'log': input.location.log,
                'lat': input.location.lat
            };							//{ lat  =  Number, log  =  Number }
            this.registered_owner = input.registered_owner;					//chính chủ
            this.area = input.area;
            this.state = input.state;
            this.furniture_include = input.furniture_include;
            if (input.leasecontract !== undefined) {
                this.leasecontract = {
                    typecontract: input.leasecontract.typecontract,
                    deposit: input.leasecontract.deposit,
                    cost: input.leasecontract.cost,
                    contract_duration: input.leasecontract.contract_duration,
                    currency: input.leasecontract.currency
                };
            }
            if (input.salecontract !== undefined) {
                this.salecontract = {
                    typecontract: input.salecontract.typecontract,
                    land_certificate: input.salecontract.land_certificate,
                    ownership_certificate: input.salecontract.ownership_certificate,
                    cost: input.salecontract.cost,
                    payment_method: input.salecontract.payment_method,
                    currency: input.salecontract.currency
                };
            }
            this.sold = input.sold;
            this.categoryid = input.categoryid;
            this.imglist = input.imglist;
        }
    }
}