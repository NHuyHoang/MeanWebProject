import { Product } from '../Product';

export class Tablet extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        this.specificInfo = {
            'memory':input.memory,
            'ram':input.ram,
            'megapixel':input.megapixel,
            'simcard':input.simcard,
            'scrresolution':input.scrresolution,
        };
    }
}