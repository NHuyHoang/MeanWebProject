import { Product } from '../Product';

export class Laptop extends Product {
    specificInfo: any;
    constructor(input?: any) {
        super(input);
        if (input === undefined) {
            this.specificInfo = {
                'chip': "",
                'ram': "",
                'memory': "",
                'SSD': "",
                'VGA': "",
                'screen_solution': "",
                'HDD': ""
            };
        }
        else {
            this.specificInfo = {
                'chip': input.chip,
                'ram': input.ram,
                'memory': input.memory,
                'SSD': input.SSD,
                'VGA': input.VGA,
                'screen_solution': input.screen_solution,
                'HDD': input.HDD
            };
        }
    }
}