import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  AfterContentChecked,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { Title } from '@angular/platform-browser'
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { SignInManageService } from '../shared-service/sign-in-manage.service';
import { PostService } from '../shared-service/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared-service/shared-service';
declare var $: any;

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class UserHomeComponent implements OnInit, AfterContentChecked, AfterViewInit {
  private user = new User();



  constructor(
    @Inject(PostService) private postService,
    @Inject(Title) private title,
    @Inject(UserService) private userService,
    @Inject(Router) private router,
    private atvRouter: ActivatedRoute,
  ) {
    window.scrollTo(0, 0)
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.router.navigate(['user/post']);
  }

  ngOnInit() {

  }

  ngAfterContentChecked() {
    this.title.setTitle(`${this.user.name}'s home`);
  }

  ngAfterViewInit() {
    $('.rating')
      .rating({
        initialRating: this.user.point,
        maxRating: 5
      });
  }
}
