import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { PrivatePostService } from '../private-services/private-post.service';
import { PostService, DateTimeFormatService } from '../../shared-service/shared-service';
import { Router } from '@angular/router'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
declare var $: any;

@Component({
  selector: 'app-admin.manage-post',
  templateUrl: './admin.manage-post.component.html',
  styleUrls: ['./admin.manage-post.component.css']
})
export class AdManagePostComponent implements OnInit,AfterViewInit {
  private showInfo = false;
  private loading = true;
  private posts = [];
  private showTable = true;
  private specPost;
  private loaded = 0;
  private post = new BehaviorSubject<any>({});
  private user = new BehaviorSubject<any>({});
  private offset = {x:0,y:0};

  constructor( @Inject(PrivatePostService) private prPostSv,
    @Inject(PostService) private postSv,
    @Inject(DateTimeFormatService) private datetimeformatSV,
    @Inject(Router) private router) {
    this.onGetPost();
    this.post.subscribe(p => {
      if(p !== undefined)
        this.user.next(p.userpost);
    })
  }

  ngAfterViewInit(){
   
  }

  ngOnInit() {
  }

  showPostInfo() {
    this.showInfo = !this.showInfo;
  }

  onGetPost(filter?) {
    if (filter === undefined)
      filter = {}
    filter.skip = this.loaded;
    this.prPostSv.getAll(filter).subscribe(result => {
      console.log(result);
      this.loading = false;

      let holder = this.postSv.formatPostList(result)

      let datePost = { date: "", time: "" };
      holder.forEach((item, index, obj) => {
        datePost.date = this.datetimeformatSV.formatDate(item.date);
        datePost.time = item.date.getHours().toString() + "h" + item.date.getMinutes().toString();
        obj[index].display = datePost.date + " " + datePost.time;
      })

      this.posts = this.posts.concat(holder);
      this.loaded += this.posts.length;
      console.log(this.posts)
    });
  }

  specInfo(post) {
    this.showTable = false;
  }

  onToggle() {
    this.loaded = 0;
    this.posts = [];
    this.onGetWithFilter();
  }

  onRedirect(post) {
    this.offset.x = pageXOffset;
    this.offset.y = pageYOffset;
    $('.table_info').transition('fly left');
    this.post.next(post);
    this.showInfo = true;
    
    //this.router.navigate(['post', id]);
  }

  onBack(){
    $('.table_info').transition('fly left');
    this.showInfo = false;
    window.scrollTo(this.offset.x,this.offset.y);
  }

  onGetWithFilter() {
    if ($('.approval_checkbox').is(':checked')) {
      this.onGetPost({ approval: false });
      this.loading = true;
    }
    else
      this.onGetPost();
  }


}
