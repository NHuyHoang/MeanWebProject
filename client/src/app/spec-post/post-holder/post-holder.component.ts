import { Component, OnChanges, OnInit, Input, SimpleChanges } from '@angular/core';
import { Post } from '../../../models/Posts';
import { User } from '../../../models/User';


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
  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'].currentValue._id !== undefined) {
      this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");
    }
    if(changes['user'].currentValue._id !== undefined){
      
    }
  }

}
