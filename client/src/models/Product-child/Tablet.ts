import { Product } from '../Product';

export class Tablet extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        if(input === undefined){
            this.specificInfo = {
                'memory':"",
                'ram':"",
                'megapixel':"",
                'simcard':"",
                'screen_solution':"",
            };
        }else{
            this.specificInfo = {
                'memory':input.memory,
                'ram':input.ram,
                'megapixel':input.megapixel,
                'simcard':input.simcard,
                'screen_solution':input.screen_solution,
            };
        }
        
    }
}