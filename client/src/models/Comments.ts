import { User } from "./User";

export class Comment{
    _id:string;
    cmt:string;
    date:Date;
    usercmt:User;
    reply:any[];
    constructor(_id?:string, cmt?:string, date?:string, usercmt?:User, reply?:any[]){
        this._id = _id;
        this.cmt = cmt;
        this.date = new Date(date);
        this.usercmt = usercmt;
        this.reply = reply;
    }
    formatDate(date:Date):string{
        return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    }
}