import { Component, OnInit, OnChanges, AfterContentInit, Input, Renderer2, Inject, SimpleChanges } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser'

import { User } from '../../models/User';
import { Post } from '../../models/Posts';
import { AreaService } from '../shared-service/area.service';
import { DateTimeFormatService } from '../shared-service/date-time-format.service';
import { CategoryService } from '../shared-service/category.service';
import { AfterViewChecked } from '@angular/core/src/metadata/lifecycle_hooks';



@Component({
  selector: 'mini-post',
  templateUrl: './minified-post.component.html',
  styleUrls: ['./minified-post.component.css']
})
export class MinifiedPostComponent implements OnInit, OnChanges, AfterContentInit {
  @Input('user') user: User;
  @Input('post') post: Post;
  private tab1 = true;
  private tab2 = false;

  private products = [];
  private ellipsisTitle;
  private categories = "";
  private ctgrArr = [];
  private area;
  private datePost = { date: "", time: "" };
  constructor(
    @Inject(DOCUMENT) private _doc,
    @Inject(Renderer2) private _render,
    @Inject(AreaService) private areaService,
    @Inject(DateTimeFormatService) private datetimeformatSV,
    @Inject(CategoryService) private categorySV) {
  }

  ngOnInit() {
    this.ellipsisTitle = this.post.title.replace(/^(.{50}[^\s]*).*/, "$1");
    let s = this._render.createElement('script');
    s.type = 'text/javascript';
    s.text = `
    $('.rating').rating({
      initialRating: ${this.user.point},
      maxRating: 5
    });
    `;
    this._render.appendChild(this._doc.body, s);
    this.datePost.date = this.datetimeformatSV.formatDate(this.post.date);
    this.datePost.time = this.post.date.getHours().toString() + "h" + this.post.date.getMinutes().toString();

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['post']) {
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
  }

  ngAfterContentInit() {

  }

  onToggleTab(tabId: string) {
    this.products.forEach(element => {
      if (tabId === element._id)
        element.active = true;
      else element.active = false;
    })
  }
}
