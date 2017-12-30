import { Injectable, Inject } from '@angular/core';
import { URLSearchParams,RequestOptions,Headers,Http, Response } from '@angular/http';

@Injectable()
export class PrivatePostService {
  private body = new URLSearchParams();
  private option = new RequestOptions({headers:new Headers({'Content-Type': 'application/json'})});
  private PREFIX = 'private/'
  private GET_POST = `${this.PREFIX}post/getall`;
  constructor(@Inject(Http) private http) { }

  getAll(filter){
    return this.http.post(this.GET_POST,JSON.stringify(filter),this.option)
      .map((res:Response) => res.json());
  }

}
