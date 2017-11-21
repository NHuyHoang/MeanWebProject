import {
  Component,
  OnInit,
  ViewEncapsulation,
  Inject,
  Renderer2,
  AfterContentChecked,
  HostListener
} from '@angular/core';
import { DOCUMENT, Title } from '@angular/platform-browser'
import { BehaviorSubject } from 'rxjs/Rx';

import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { SignInManageService } from '../shared-service/sign-in-manage.service';
import { PostService } from '../shared-service/post.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class UserHomeComponent implements OnInit, AfterContentChecked {
  private user = new User();
  private userSubcription: BehaviorSubject<User> = new BehaviorSubject(null);
  private posts: Post[];
  private postsCount: number = 0;
  private loading = false;
  private currentPost = 0;

  @HostListener("window:scroll", [])
  onScroll() {
    let body = document.body,
      html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if ((window.innerHeight + window.scrollY) >= height) {
      if(this.currentPost >= this.postsCount)
      {
        this.loading = false;
        return;
      }
      this.loading = true;
      this.currentPost += 5;
      if(this.currentPost >= this.postsCount)
        this.currentPost = this.postsCount;
      this.postService.getUserPost(this.user._id, this.currentPost.toString()).subscribe(data => {
        let tempPost:Post[] = this.postService.formatPostList(data);
        tempPost.forEach(post => this.posts.push(post));
        this.loading = false;
      })
    }

  }

  constructor(
    private signInManageSV: SignInManageService,
    @Inject(Renderer2) private _renderer2,
    @Inject(DOCUMENT) private _document,
    @Inject(PostService) private postService,
    @Inject(Title) private title,
  ) {
    this.signInManageSV.getUserSubscribe(this.userSubcription);
    this.userSubcription.subscribe(user => {
      this.user = user;
    });

  }

  ngOnInit() {
    this.postService.getUserPost(this.user._id, this.currentPost.toString).subscribe(data => {
      this.posts = this.postService.formatPostList(data);
      this.postsCount = data[data.length - 1].postcount;
      this.currentPost = this.posts.length;
    })
    this.onAppendScript();
  }

  ngAfterContentChecked() {
    this.title.setTitle(`${this.user.name}'s home`);
  }


  onSub() {

  }

  onGeneratePost() {

  }

  onAppendScript(){
    let s = this._renderer2.createElement('script');
    s.type = `text/javascript`;
    s.text = `
    $('.rating')
    .rating({
      initialRating: ${this.user.point},
      maxRating: 5
    });
    `;
    this._renderer2.appendChild(this._document.body, s);
  }

}