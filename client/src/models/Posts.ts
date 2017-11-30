import { Comment } from './Comments';
import { } from 'date-'
export class Post{
    _id:string; 
    vipexpire:Date; 
    date:Date; 
    title:string;
    subareaid:string;
    userpost:string;
    comment:Comment[];
    product:any[];
    approval:boolean;
    available:boolean;
    constructor(
        _id?:string, 
        vipexpire?:string, 
        date?:string, 
        title?:string,
        subareaid?:string,
        userpost?:string,
        comment?:Comment[],
        product?:any[],
        approval?:boolean,
        available?:boolean
    )
    {
        this._id = _id;
        this.vipexpire = new Date(vipexpire);
        this.date = new Date(date);
        this.title = title;
        this.subareaid = subareaid;
        this.userpost = userpost;
        this.comment = comment;        
        this.product = product;
        this.approval = approval;
        this.available = available;
    }
    
    
}