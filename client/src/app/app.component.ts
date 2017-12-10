import { Component, AfterContentChecked, ViewEncapsulation } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { SignInManageService } from './shared-service/sign-in-manage.service';
import { BehaviorSubject } from 'rxjs/Rx'

import { User } from '../models/User'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterContentChecked {
  private notSignIn = true;
  private user = new User();
  private signInUser: BehaviorSubject<User> = new BehaviorSubject(null);

  constructor(private title: Title, private signInManageSv: SignInManageService) {

    // subscribe for the user who successfully logined
    signInManageSv.getUserSubscribe(this.signInUser);
    this.signInUser.subscribe(user => {
      if (user._id !== undefined) {
        this.notSignIn = false;
        this.user = user;
      } 
    });
  }

  ngAfterContentChecked() {
    this.title.setTitle("Welcome");
  }

}
