import { Component, OnInit, OnChanges, AfterViewInit, Input, Inject, SimpleChanges } from '@angular/core';

import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { Router } from '@angular/router';
import { AreaService, DateTimeFormatService, CategoryService } from '../shared-service/shared-service'

declare var $:any;

@Component({
  selector: 'mini-post',
  templateUrl: './minified-post.component.html',
  styleUrls: ['./minified-post.component.css']
})
export class MinifiedPostComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('user') public user = new User();
  @Input('post') public post;
  @Input('isSpec') public isSpec;
  @Input('isHomeMode') public homeMode;

  private tab1 = true;
  private tab2 = false;

  private products = [];
  private ellipsisTitle;
  private categories = "";
  private ctgrArr = [];
  private area;
  private datePost = { date: "", time: "" };
  private cmtCount = 0;
  constructor(

    @Inject(AreaService) private areaService,
    @Inject(DateTimeFormatService) private datetimeformatSV,
    @Inject(CategoryService) private categorySV,
    @Inject(Router) private router) {
     
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['post'].currentValue._id !== undefined) {
      //format the mini post
      this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");
      this.datePost.date = this.datetimeformatSV.formatDate(this.post.date);
      this.datePost.time = this.post.date.getHours().toString() + "h" + this.post.date.getMinutes().toString();
      this.cmtCount = this.post.comment.length;
      //get area name
      this.areaService.getChildArea(this.post.subareaid).subscribe((data) => {
        this.area = data;
        //get category name
        this.post.product.forEach((element) => {
          let categoryName: string;
          if (element.categoryid == 'est') {
            if (this.categories == "") this.categories = this.categories.concat(element._type);
            else this.categories = this.categories.concat(" | " + element._type);
            element.category = element._type;
            element.active = false;
            this.products.push(element)
            if (this.products.length == 1)
              this.products[0].active = true;
          }
          else {
            this.categorySV.getAreaById(element._type).subscribe((data) => {
              if (this.categories == "") this.categories = this.categories.concat(data.subcategory.name);
              else this.categories = this.categories.concat(" | " + data.subcategory.name);
              element.category = data.subcategory.name;
              element.active = false;
              this.products.push(element)
              if (this.products.length == 1)
                this.products[0].active = true;
            })
          }
        })

      })

    }
    if (changes['user'].currentValue._id !== undefined) {
    }
  }

  ngAfterViewInit(){
    //semantic-ui display user point
    $('.rating').rating({
      initialRating: this.user.point,
      maxRating: 5
    });
  }
  //toggle product tab
  onToggleTab(tabId: string) {
    this.products.forEach(element => {
      if (tabId == element._id)
        element.active = true;
      else element.active = false;
    })
  }
  //navigate to the specific post
  onPostRedirect() {
    this.router.navigate(['/post', this.post._id]);
  }

  onCheckAvailable(){
    if(this.post._id !== undefined){
      if (this.homeMode === undefined)
        this.homeMode = true;
      return this.homeMode&&(this.post.approval||this.post.available)
    }
  }
  //hide or show the post's configuration if this post is not owned by user
  onCheckUserPost(){
    if(this.post._id !== undefined){
      let user = JSON.parse(localStorage.getItem("currentUser"));
      if(this.post.userpost._id)
        return this.post.userpost._id === user._id;
      else return this.post.userpost === user._id;
    }
    return false;
  }

  onCompareDate(date:Date){
    let d = new Date();
    return date > d;
  }

  onNavigateUserHome(){
    this.router.navigate(['visit',this.post.userpost._id]);
  }
}
