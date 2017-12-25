import { Product } from '../Product';

export class Bicycle extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        if(input === undefined){
            this.specificInfo = {
                'species':"",
                'year_bought':""
            };
        }
        else{
            this.specificInfo = {
                'species':input.species,
                'year_bought':input.year_bought
            };
        }
        
    }
}