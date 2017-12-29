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
  private postCount = 0;


  constructor(
    @Inject(PostService) private postService,
    @Inject(Title) private title,
    @Inject(Router) private router,
    private atvRouter: ActivatedRoute,
  ) {
    window.scrollTo(0, 0)
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    this.postService.getPostCount(this.user._id).subscribe(data => {
      this.postCount = data.count;
      let path = location.pathname;
      if(path === "/user/post-create")
        this.router.navigate(['user/post-create']);
      else
        this.router.navigate(['user/post']);
    });
    
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
