import { Component, OnInit, OnDestroy, Inject, HostListener } from '@angular/core';
import { Subscription } from 'rxjs/Rx'
import { Router } from '@angular/router';
import { User } from '../../../models/User';
import { Post } from '../../../models/Posts';
import { PostService } from '../../shared-service/shared-service';
declare var $:any;

@Component({
  selector: 'app-user-post',
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.css']
})
export class UserPostComponent implements OnInit {
  private user;
  private posts: Post[] = [];
  private postsCount: number = 0;
  private loading = false;
  private currentPost = 0;
  private isHomeMode = true;
  private isUserHomeMode = true;

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

  constructor(@Inject(PostService) private postService,private router: Router) {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    if (this.user._id !== undefined) {
      this.getUserPost();
      
    }
  }

  ngOnInit() {
  }


  getUserPost() {

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

}
