import { Product } from '../Product';

export class Camera extends Product{
    specificInfo:any;
    constructor(input?:any){
        super(input);
        if(input === undefined){
            this.specificInfo = {
                'iso':"",
                'megapixel':"",
                'fps':"",
                'lens':"",
                'shots':""
            };
        }
        else{
            this.specificInfo = {
                'iso':input.iso,
                'megapixel':input.megapixel,
                'fps':input.fps,
                'lens':input.lens,
                'shots':input.shots
            };
        }
    }
}