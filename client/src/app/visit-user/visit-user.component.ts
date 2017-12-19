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
  selector: 'app-visit-user',
  templateUrl: './visit-user.component.html',
  styleUrls: ['./visit-user.component.css']
})
export class VisitUserComponent implements OnInit {
  private user = new User();
  private posts: Post[] = [];
  private postsCount: number = 0;
  private loading = false;
  private currentPost = 0;
  //if user scroll to the bottom of the page
  //system will find the next 5 post and push to the posts array
  @HostListener("window:scroll", [])
  onScroll() {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    //if user scoll to the max height
    if ((window.innerHeight + window.scrollY) >= height) {
      //check if all of user's post displayed or not
      if (this.currentPost >= this.postsCount) {
        this.loading = false;
        return;
      }
      this.loading = true;
      this.getUserPost();

    }

  }

  constructor(
    @Inject(PostService) private postService,
    @Inject(Title) private title,
    @Inject(UserService) private userService,
    @Inject(Router) private router,
    private atvRouter:ActivatedRoute,
  ) {
    let userId = this.atvRouter.snapshot.params['id'];
      this.userService.getUserInfo(userId).subscribe(data => {
        this.user = data;
        this.getUserPost();
      })
    
  }
  //get next 5 posts
  getUserPost(){

    this.postService.getUserPost(this.user._id, this.currentPost.toString()).subscribe(data => {
      let tempPost: Post[] = this.postService.formatPostList(data);
      tempPost.forEach(post => this.posts.push(post));
      this.loading = false;
      this.currentPost += 5;
      this.postsCount = data[data.length - 1].postcount;
      if (this.currentPost >= this.postsCount)
        this.currentPost = this.postsCount;
    })
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
