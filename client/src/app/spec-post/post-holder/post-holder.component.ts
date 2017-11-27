import { Component, OnChanges, OnInit, Input, SimpleChanges, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
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
  private cmtForm = new FormControl();
  private signInUser;
  constructor(@Inject(FormBuilder) private formbuilder) {
    this.signInUser = JSON.parse(localStorage.getItem('currentUser'));
    this.cmtForm = this.formbuilder.group({
      '_id':"",
      'userpost':[this.signInUser ],
      'date':new Date(),
      'cmt':[],
    })
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post'].currentValue._id !== undefined) {
      this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");
      this.cmtForm.patchValue({
        _id:this.post._id
      })
    }
    if(changes['user'].currentValue._id !== undefined){
      
    }
  }

  onSubmit(){
    console.log(this.cmtForm.value);
  }

 

}
