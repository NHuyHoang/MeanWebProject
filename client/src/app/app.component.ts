import { Component, AfterContentChecked, ViewEncapsulation, OnDestroy, AfterViewChecked } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/Rx'

import { User } from '../models/User'
import { Router } from '@angular/router';
import { LoginPageService } from './login-page/login-page.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterContentChecked, OnDestroy, AfterViewChecked {
  private notSignIn = true;
  private img;
  private subscription: Subscription;

  constructor(
    private title: Title,
    private router: Router,
    private loginSv: LoginPageService) {
    
    if ( JSON.parse(localStorage.getItem('currentUser')) !== null && 
         Object.keys(JSON.parse(localStorage.getItem('currentUser'))).length !== 0) {
      let user = JSON.parse(localStorage.getItem('currentUser'));
      this.notSignIn = false;
      this.img = user.img;
    }

    //subscribe for the user who susscessfully login
    this.subscription = loginSv.onSignInUserSubcribe().subscribe(user => {
        if(user._id !== undefined){
          this.img = user.img;
          this.notSignIn = false;
        } 
      })
  

    
  }

  ngAfterContentChecked() {
    this.title.setTitle("Welcome");
  }

  ngAfterViewChecked(){
    
  } 

  onLogOut(){
    localStorage.removeItem("currentUser");
    this.notSignIn = true;
  }

  onNavigateUserHome() {
    this.router.navigate(['user']);
  }

  ngOnDestroy(){
    console.log("destroy");
    //this.notSignIn = true;
  }
}
