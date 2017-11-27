import { Component, OnInit, Input, OnChanges, SimpleChanges, Inject} from '@angular/core';
import { Comment} from '../../../../../models/Comments'
import { User } from '../../../../../models/User';
import { UserService } from '../../../../shared-service/user.service';
import { DateTimeFormatService } from '../../../../shared-service/date-time-format.service';
import { SignInManageService } from '../../../../shared-service/sign-in-manage.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnChanges {
  @Input('comment') comment:Comment;
  private user:User;
  private reply:any[];

  private showReply = false;
  private dateComment = {date:"",time:""};
  private signInUser;
  constructor(
    @Inject(UserService) private userSV,
    @Inject(DateTimeFormatService) private datetimeformatSV) {
    this.signInUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['comment'].currentValue !== undefined){
      this.dateComment.date = this.datetimeformatSV.formatDate(this.comment.date);
      this.dateComment.time = this.comment.date.getHours().toString() + "h" + this.comment.date.getMinutes().toString();
      this.user = this.comment.usercmt;
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
  }

  onToggleReply(){

    return this.showReply =!this.showReply;
  }
}
