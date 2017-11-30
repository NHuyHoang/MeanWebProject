import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Comment} from '../../../../../models/Comments'
import { User } from '../../../../../models/User';
import { UserService } from '../../../../shared-service/user.service';
import { DateTimeFormatService } from '../../../../shared-service/date-time-format.service';
import { SignInManageService } from '../../../../shared-service/sign-in-manage.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../../../shared-service/post.service';

import * as _ from 'lodash';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input('comment') comment:Comment;
  private user:User;
  private reply:any[];
  private replyForm = new FormControl()
  private showReply = false;
  private dateComment = {date:"",time:""};
  private signInUser;
  private collapsed = false;
  constructor(
    @Inject(UserService) private userSV,
    @Inject(DateTimeFormatService) private datetimeformatSV,
    @Inject(FormBuilder) private formBuilder,
    @Inject(Title)private title,
    @Inject(ActivatedRoute) private atvRoute,
    @Inject(PostService) private postSV){
    
    this.signInUser = JSON.parse(localStorage.getItem('currentUser'));
    this.replyForm = formBuilder.group({
      '_postid':atvRoute.snapshot.params['_id'],
      '_cmtid':'',
      'usercmt':this.signInUser._id,
      'date':'',
      'cmt':['',Validators.required]
    })
  }

  ngOnInit() {
  }


  ngOnChanges(changes:SimpleChanges){
    if(changes['comment'].currentValue._id !== undefined){
      this.dateComment.date = this.datetimeformatSV.formatDate(this.comment.date);
      this.dateComment.time = this.comment.date.getHours().toString() + "h" + this.comment.date.getMinutes().toString();
      this.user = this.comment.usercmt;
      this.reply = [];
      if(this.comment.reply !== undefined){
        this.reply = this.comment.reply;
        this.reply.forEach(element => {
          let date = this.datetimeformatSV.formatDate(element.date);
          let time = element.date.getHours().toString() + "h" + element.date.getMinutes().toString();
          element.date = `${time} ${date}`;
          this.userSV.getUserInfo(element.usercmt).subscribe(
            user =>{
              element.usercmt = user;
            })
        })
      }
      this.replyForm.patchValue({
        '_cmtid':this.comment._id
      })
    }
  }

  onToggleReply(){
    return this.showReply =!this.showReply;
  }
  
  onSubmitReply(){
    if(this.replyForm.invalid || this.signInUser._id === undefined) return;
    this.replyForm.patchValue({
      'date':(new Date()).toISOString()
    })
    this.postSV.pushRep(this.replyForm.value).subscribe(data => {
      if(data.success === true)
      {
        this.collapsed = true;
        this.showReply = true;
        data.data.usercmt = this.signInUser;
        this.reply.push(data.data);
      }
    })
  }
}
