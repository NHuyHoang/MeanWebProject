import { Product } from '../Product';

export class Mobile extends Product {
    specificInfo: any;
    constructor(input?: any) {
        super(input);
        if (input === undefined) {
            this.specificInfo = {
                'memory':"",
                'ram':"",
                'megapixel':""
            };
        }
        else {
            this.specificInfo = {
                'memory': input.memory,
                'ram': input.ram,
                'megapixel': input.megapixel
            };
        }

    }
}