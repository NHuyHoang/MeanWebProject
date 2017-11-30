import { Component, OnChanges, OnInit, Input, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Post } from '../../../models/Posts';
import { User } from '../../../models/User';
import { Comment } from '../../../models/Comments';
import { PostService } from '../../shared-service/post.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'post-holder',
  templateUrl: './post-holder.component.html',
  styleUrls: ['./post-holder.component.css']
})
export class PostHolderComponent implements OnChanges, OnInit {
  @Input('user') user: User;
  @Input('post') post: Post;
  private ellipsisTitle;
  private isSpec = true;
  private cmtForm = new FormControl();
  private signInUser;
  private comments;
  constructor(@Inject(FormBuilder) private formbuilder, @Inject(PostService) private postSV) {
    this.signInUser = JSON.parse(localStorage.getItem('currentUser'));
    this.cmtForm = this.formbuilder.group({
      '_id':"",
      'userpost':this.signInUser._id,
      'date':"",
      'cmt':['',Validators.required]
    })
    
  }

  ngOnInit() {
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'].currentValue._id !== undefined) {
      this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");
      this.comments = this.post.comment;
      this.cmtForm.patchValue({
        _id:this.post._id
      })
    }
    if(changes['user'].currentValue._id !== undefined){
      
    }
  }

  onSubmit(){
    if(!this.cmtForm.valid || this.signInUser._id === undefined) return;
    this.cmtForm.patchValue({
      date:(new Date()).toISOString(),
    })
    this.postSV.pushCmt(this.cmtForm.value).subscribe(data => {
      if(data.success === true){
        let retrieved = data.data;
        this.comments.push(new Comment(retrieved._id,retrieved.cmt,retrieved.date,this.signInUser,retrieved.replay));
        this.onScrollBot();
      }
    });
  }

  onScrollBot(){
    let body = document.body,
    html = document.documentElement;

    let height = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight);

    window.scrollTo(0,height);
  }

 

}
