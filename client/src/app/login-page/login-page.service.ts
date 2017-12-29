import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers} from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/Rx';

import { User } from '../../models/User';
import { GLOBAL_VAR } from '../shared-service/shared-variable'

@Injectable()
export class LoginPageService {
  private USER_VALIDATE_URL = `${GLOBAL_VAR.APP_URL_PREFIX}user/getbyemailpass`;
  private user = new User();
  private body = new URLSearchParams();
  private header = new Headers();
  private signinUser : BehaviorSubject<User> = new BehaviorSubject(this.user);

  constructor(private http:Http) {
    this.header.append('Content-Type', 'application/x-www-form-urlencoded');
   }

  getUserByEmailPass(email:string, pass:string){
    this.body.set('email',email);
    this.body.set('pass',pass);
    
    return this.http.post(this.USER_VALIDATE_URL,this.body,{
      headers:this.header
    }).map(
      (res:Response) => res.json()
    )
  }

  onEmitSigninUser(user:User){
    this.signinUser.next(user);
    console.log("emitted ");
  }

  onSignInUserSubcribe(){
    return this.signinUser;
  }

}
