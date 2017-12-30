import { Injectable } from '@angular/core';
import { URLSearchParams,Http,Response } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';
@Injectable()
export class UserService {
  private body = new URLSearchParams;
  private GET_USER_BYID = `user/`
  constructor(private http:Http) { 
  }

  getUserInfo(id:string){
    this.body.append('id',id);
    return this.http.post(this.GET_USER_BYID,this.body).map(
      (res:Response) => res.json()
    )
  }
}
