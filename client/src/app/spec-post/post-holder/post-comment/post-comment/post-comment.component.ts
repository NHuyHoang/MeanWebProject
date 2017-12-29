import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { Comment } from '../../../../../models/Comments'
import { User } from '../../../../../models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UserService,
  DateTimeFormatService,
  PostService
 } from '../../../../shared-service/shared-service';


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
    @Inject(Title) private title,
    @Inject(Router) private router,
    @Inject(ActivatedRoute) private atvRoute,
    @Inject(PostService) private postSV){
    
    this.signInUser = JSON.parse(localStorage.getItem('currentUser'));
    if(this.signInUser !== null){
      this.replyForm = formBuilder.group({                                      //create a reply form
        '_postid':atvRoute.snapshot.params['_id'],
        '_cmtid':'',
        'usercmt':this.signInUser._id,
        'date':'',
        'cmt':['',Validators.required]
      })
    }
  }

  ngOnInit() {
  }


  ngOnChanges(changes:SimpleChanges){
    if(changes['comment'].currentValue._id !== undefined){
      this.dateComment.date = this.datetimeformatSV.formatDate(this.comment.date);      //format date time comment
      this.dateComment.time = this.comment.date.getHours().toString()
                               + "h" + this.comment.date.getMinutes().toString();
      this.user = this.comment.usercmt;
      this.reply = [];
      if(this.comment.reply !== undefined){
        this.reply = this.comment.reply;
        this.reply.forEach(element => {
          let date = this.datetimeformatSV.formatDate(element.date);                  //format date time reply
          let time = element.date.getHours().toString()
                     + "h" + element.date.getMinutes().toString();
          element.date = `${time} ${date}`;                                           
          this.userSV.getUserInfo(element.usercmt).subscribe(                        //get the user reply info
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
  
  //submit reply
  onSubmitReply(){
    if(this.replyForm.invalid || this.signInUser._id === null) {
      alert("Please login for comment or reply another user");
      return
    };
    this.replyForm.patchValue({
      'date':(new Date()).toISOString()
    })
    this.postSV.pushRep(this.replyForm.value).subscribe(data => {                       //save the reply to database
      if(data.success === true)                                                         //if success push a reply to comment
      {                                                                     
        this.collapsed = true;
        this.showReply = true;
        data.data.usercmt = this.signInUser;
        let dateHolder = new Date(data.data.date);
        let date = this.datetimeformatSV.formatDate(dateHolder);                  //format date time reply
        let time = dateHolder.getHours().toString()
                   + "h" + dateHolder.getMinutes().toString();
        data.data.date =  `${time} ${date}`;
        this.reply.push(data.data)
      }
    })
  }
  onNavigateUserHome(id){
    this.router.navigate(['visit',id])
  }
}
