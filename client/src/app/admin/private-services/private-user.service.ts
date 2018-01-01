import { Injectable, Inject } from "@angular/core";
import { Http, URLSearchParams, RequestOptions, Headers, Response } from "@angular/http";

@Injectable()
export class PrivateUserService{
    private body = new URLSearchParams();
    private option = new RequestOptions({headers:new Headers({'Content-Type': 'application/json'})});
    private GET_ALL = "user/getall";
    private COUNT = "user/count"
    constructor(@Inject(Http) private http){}

    getAll(obj){
        return this.http.post(this.GET_ALL,JSON.stringify(obj),this.option)
            .map((res:Response) => res.json());
    }
    
    countUser(){
        return this.http.get(this.COUNT)
            .map((res:Response) => res.json());
    }
}