import { Injectable } from '@angular/core';
import { URLSearchParams,Headers,Http,Response } from '@angular/http';
import { GLOBAL_VAR } from './shared-variable';
@Injectable()
export class UserService {
  private body = new URLSearchParams;
  private header = new Headers();
  private GET_USER_BYID = `${GLOBAL_VAR.APP_URL_PREFIX}/user/`
  constructor(private http:Http) { 
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getUserInfo(id:string){
    this.body.set('id',id);
    return this.http.post(this.GET_USER_BYID,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }
}
