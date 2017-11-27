import { Injectable } from '@angular/core';
import { LoginPageService } from '../login-page/login-page.service';
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from '../../models/User'

@Injectable()
export class SignInManageService {

  constructor(private loginPageService:LoginPageService) { 
    
  }

  getUserSubscribe(signInUser:BehaviorSubject<User>){
    this.loginPageService.signinUser.subscribe(user => {
      signInUser.next(user);
      localStorage.setItem('currentUser',JSON.stringify(user));
    });
  }

  

}
