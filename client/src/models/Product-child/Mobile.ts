import { Product } from '../Product';

export class Mobile extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        this.specificInfo = {
            'memory':input.memory,
            'ram':input.ram,
            'megapixel':input.megapixel
        };
    }
}