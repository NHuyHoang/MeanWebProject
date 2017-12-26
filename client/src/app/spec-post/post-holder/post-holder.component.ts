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
    //create a comment form
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
    if (changes['post'].currentValue._id !== undefined) {                         //if the @Input('post') has value
      this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");     //decrease title length
      this.comments = this.post.comment;                                          //set value for comments obj
      this.cmtForm.patchValue({
        _id:this.post._id                                                         //set post id for comment form
      })
    }
  }

  //submit the comment
  onSubmit(){
    if(!this.cmtForm.valid || this.signInUser._id === undefined) return;
    this.cmtForm.patchValue({                                                     //set the date time comment
      date:(new Date()).toISOString(),
    })
    this.postSV.pushCmt(this.cmtForm.value).subscribe(data => {                   //save the comment to the database
      if(data.success === true){                                                  //if successfully save
        let retrieved = data.data;                                                
        this.comments.push(                                                       //push the comment to the comments array
          new Comment(retrieved._id,retrieved.cmt,retrieved.date,
                      this.signInUser,retrieved.reply)
        );
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
