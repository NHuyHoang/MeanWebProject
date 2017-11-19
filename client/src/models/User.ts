export class User{
    _id:string;
    email:string;
    name:string;
    point:Number;
    img:string;
    constructor(_id?:string, email?:string, name?:string, point?:Number, img?:string){
        this._id = _id;
        this.email = email;
        this.name = name;
        this.point = point;
        this.img = img;
    }

}