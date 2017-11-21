import { Product } from '../Product';

export class Motor extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        this.specificInfo = {
            'species':input.species,
            'year_registered':input.year_registered,
            'km_numbers':input.km_numbers,
            'lincense_number':input.lincense_number,
            'cylinder_capacity':input.cylinder_capacity
        };
    }
}