import { Component, OnInit, Inject, Renderer2} from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DOCUMENT } from '@angular/platform-browser'

import { User } from '../../models/User';
import { PostService } from '../shared-service/post.service';
import { Post } from '../../models/Posts';
import { SignInManageService } from '../shared-service/sign-in-manage.service'

@Component({
  selector: 'app-spec-post',
  templateUrl: './spec-post.component.html',
  styleUrls: ['./spec-post.component.css']
})
export class SpecPostComponent implements OnInit {
  private user = new User();
  private post = new Post();
  private postId;
  constructor(
    @Inject(ActivatedRoute)private atvRoute,
    @Inject(PostService) private postservice,
    @Inject(Renderer2) private _render,
    @Inject(DOCUMENT) private _doc) 
    {
    window.scrollTo(0,0);
    this.postId = atvRoute.snapshot.params['_id'];
    this.postservice.getById(this.postId).subscribe((data)=>{
      let postholder = [];
      postholder.push(data);
      this.post = this.postservice.formatPostList(postholder)[0];
      this.user = data.userpost;
      
      this.onAppendScript();
    })
   }

  ngOnInit() {

  }

  onAppendScript(){
    let s = this._render.createElement('script');
    s.type = `text/javascript`;
    s.text = `
    $('.rating')
    .rating({
      initialRating: ${this.user.point},
      maxRating: 5,
    });
    `;
    this._render.appendChild(this._doc.body, s);
  }
}
