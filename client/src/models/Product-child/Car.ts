import { Product } from '../Product';

export class Car extends Product {
    specificInfo: any;
    constructor(input?: any) {
        super(input);
        if (input === undefined) {
            this.specificInfo = {
                'species': "",
                'year_registered': "",
                'km_numbers': "",
                'lincense_number': "",
                'gearbox': "",
                'fuel': "",
                'origin': "",
                'slots': "",
                'cylinder_capacity': ""
            };
        }
        else {
            this.specificInfo = {
                'species': input.species,
                'year_registered': input.year_registered,
                'km_numbers': input.km_numbers,
                'lincense_number': input.lincense_number,
                'gearbox': input.gearbox,
                'fuel': input.fuel,
                'origin': input.origin,
                'slots': input.slots,
                'cylinder_capacity': input.cylinder_capacity
            };
        }

    }
}