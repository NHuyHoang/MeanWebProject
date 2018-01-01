import { Injectable, Inject } from '@angular/core';
import { URLSearchParams,RequestOptions,Headers,Http, Response } from '@angular/http';

@Injectable()
export class PrivatePostService {
  private body = new URLSearchParams();
  private option = new RequestOptions({headers:new Headers({'Content-Type': 'application/json'})});
  private PREFIX = 'private/post/'
  private GET_POST = `${this.PREFIX}getall`;
  private UNAPPROVED_COUNT = `${this.PREFIX}unapproved-count`;
  private APPROVE_POST = `${this.PREFIX}approve`;
  constructor(@Inject(Http) private http) { }

  getAll(filter){
    return this.http.post(this.GET_POST,JSON.stringify(filter),this.option)
      .map((res:Response) => res.json());
  }

  unApprovedCount(){
    return this.http.get(this.UNAPPROVED_COUNT)
      .map((res:Response) => res.json());
  }

  approve(postId){
    return this.http.post(this.APPROVE_POST,JSON.stringify(postId),this.option)
      .map((res:Response) => res.json());
  }

}
