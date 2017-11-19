import {
  Component,
  AfterContentChecked,
  OnInit,
  EventEmitter
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router } from "@angular/router"
import { Title } from '@angular/platform-browser';

import { LoginPageService } from './login-page.service';
import { PostService } from '../shared-service/post.service';
import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { Comment } from '../../models/Comments';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements AfterContentChecked, OnInit {
  private loginForm: FormGroup;
  private PASS_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
  private isLoading: boolean = false;
  private user = new User();
  private failMess = false;
  private postList:Post[];


  constructor(
    private title: Title,
    private formbuilder: FormBuilder,
    private loginservice: LoginPageService,
    private postservice: PostService,
    private router:Router
  ) {
    this.loginForm = formbuilder.group({
      'email': ['Roscoe_Ratke@gmail.com'],
      'pass': ['ip_jQZJ8qGXUNBa', this.customValidator(this.PASS_REGEX).bind(this)]
    })
  }

  ngAfterContentChecked() {
    this.title.setTitle("Login page")
  }

  ngOnInit() { }

  onSubmit() {
    const request = this.loginForm.value;
    this.isLoading = true;
    this.loginservice.getUserByEmailPass(request.email, request.pass).subscribe(
      (data: any) => {
        let promise = new Promise((resolve) => {
          setTimeout(resolve, 1000)
        }).then(
          () => {
            this.isLoading = false;
            if (data._id === undefined) {
              this.failMess = true;
            }
            else {
              this.user = new User(data._id, data.email, data.name, data.point, data.img);
              this.loginservice.onEmitSigninUser(this.user);
              this.router.navigate(['user']);
              /* this.postservice.getUserPost(this.user._id).subscribe(
                (data:any) =>{
                  this.loginservice.onEmitSigninUser(this.user);
                  this.postList = this.postservice.formatPostList(data);
                  this.router.navigate(['user']);
                }
              ) */
              //window.location.href = "/user";
            }
          })

      }
    )
  }

  customValidator(regexp: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const test = regexp.test(control.value);
      let pristine = control.pristine;
      /* if (pristine)
        return null; */
      if ((control.value === "" || control.value === " "))
        return { 'invalid': true };
      else return test ? null : { 'invalid': true };
    }
  }

  onFailMess() {
    this.failMess = false;
  }

}
