export class Estate {
    _id: string;
    _type: string;
    description: string;
    address: string;
    location: any;								//{ lat : Number, log : Number }
    registeredowner: boolean;					//chính chủ
    area: number
    state: string;
    furnitureinclue: boolean;
    leasecontract: any;
    salecontract: any;
    categoryid: string;
    imglist: string[];
    constructor(input?: any) {
        this._id = input._id;
        this._type = input._type;
        this.description = input.description;
        this.address = input.address;
        this.location = {
            'log': input.location.log,
            'lat': input.location.lat
        };							//{ lat  =  Number, log  =  Number }
        this.registeredowner = input.registeredowner;					//chính chủ
        this.area = input.area;
        this.state = input.state;
        this.furnitureinclue = input.furnitureinclue;
        if (input.leasecontract !== undefined) {
            this.leasecontract = {
                typecontract: input.leasecontract.typecontract,
                deposit: input.leasecontract.deposit,
                cost: input.leasecontract.cost,
                contractduration: input.leasecontract.contractduration,
                currency: input.leasecontract.currency
            };
        }
        if (input.salecontract !== undefined) {
            this.salecontract = {
                typecontract: input.salecontract.typecontract,
                land_certificate: input.salecontract.land_certificate,
                ownership_certificate: input.salecontract.ownership_certificate,
                cost: input.salecontract.cost,
                paymentmethod: input.salecontract.paymentmethod,
                currency: input.salecontract.currency
            };
        }
        this.categoryid = input.categoryid;
        this.imglist = input.imglist;
    }
}