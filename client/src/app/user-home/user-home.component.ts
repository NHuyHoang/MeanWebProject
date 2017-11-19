import { 
  Component, 
  OnInit,
  ViewEncapsulation,
  Inject,
  Renderer2,
  AfterContentChecked
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
export class UserHomeComponent implements OnInit, AfterContentChecked{
  private user = new User();
  private userSubcription:BehaviorSubject<User> = new BehaviorSubject(null);
  private posts:Post[];
  private postsCount:number = 0;

  constructor(
      private signInManageSV:SignInManageService, 
      @Inject(Renderer2) private _renderer2, 
      @Inject(DOCUMENT) private _document,
      @Inject(PostService) private postService,
      @Inject(Title) private title,
    ) 
    { 
      this.signInManageSV.getUserSubscribe(this.userSubcription);
      this.userSubcription.subscribe(user => {       
      this.user = user;
    });
    
  }

  ngOnInit() {
   
    this.postService.getUserPost(this.user._id).subscribe(data => {
      this.posts = this.postService.formatPostList(data);
      console.log(this.posts);
      this.postsCount = this.posts.length;
    })
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

  ngAfterContentChecked(){
    this.title.setTitle(`${this.user.name}'s home`);
  }


  onSub(){
    
  }

}
