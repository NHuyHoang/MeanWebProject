import { Component, OnInit, AfterViewInit, Inject, HostListener, AfterContentInit } from '@angular/core';
import { PostService, AreaService, GLOBAL_VAR } from '../shared-service/shared-service';
import { Post } from '../../models/Posts';
declare let noUiSlider:any;
declare let $:any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit, AfterContentInit {
  private nouislider;
  private range = {min:0,max:0};
  private loaded = 0;
  private loading = false;
  private areas = [];
  private posts:Post[] = [];
  private CURRENCY = GLOBAL_VAR.CURRENCY;
  private PRODUCTS = [];
  private ctgrCount = 0;
  constructor(
    @Inject(PostService) private postSV,
    @Inject(AreaService) private areaSV){ 
    this.onGetPost()
    this.areaSV.getAllAreas().subscribe( data => {
      this.areas = data;
     this.formatProductsArr();
    })
  }

  @HostListener('window:scroll',[])
  onscroll(){
    let body = document.body,
      html = document.documentElement;
    
    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if((window.innerHeight + window.scrollY) >= height){
      this.loading = true;
      this.onGetPost();
    }
  }
  
  ngAfterViewInit(){
    this.nouislider = noUiSlider();
    let slider = document.getElementById('slider');
    let max = 11207181;
    this.nouislider.create(slider, {
      start: [0, 11207181],
      connect: true,
      range: {
        'min': 0,
        'max': 11207181
      },
      tooltips:true,
      pips: {
        mode: 'values',
        values: [max/2,max/4,max*3/4],
        density: max/10
      }
    }); 
    $('.ui.dropdown').dropdown({
      onChange: function(value, text, $selectedItem) {
        this.ctgrCount+=1;
        console.log(this.ctgrCount);
      }
    });
  }

  onShowRange(){
    /* let range = document.getElementsByClassName("noUi-tooltip");
    this.range.min = Number.parseFloat(range[0].textContent);
    this.range.max = Number.parseFloat(range[1].textContent);
    console.log(this.range); */

    console.log($("#multi-select").dropdown("get value"))
  }

  onGetPost(){
    this.postSV.getAll(this.loaded).subscribe(data => {
      this.loading = false;
      data = this.postSV.formatPostList(data)
      data.forEach(element => {
        this.posts.push(element);
      });
      this.loaded += this.posts.length;
    })
  }

  formatProductsArr(){
    for(let key in GLOBAL_VAR.PRODUCT_ID){
      let value = {"_id":GLOBAL_VAR.PRODUCT_ID[key], "type":key};
      this.PRODUCTS.push(value);
    }
  }

  categoriesCount(){
    this.ctgrCount++;
    console.log(this.ctgrCount);
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
    if(this.areas.length !== 0){

    }
  }


}
