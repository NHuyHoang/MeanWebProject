import {
  Component,
  OnInit,
  AfterViewInit, 
  Inject, 
  HostListener, 
  AfterContentInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { PostService, AreaService, GLOBAL_VAR } from '../shared-service/shared-service';
import { Post } from '../../models/Posts';
declare let noUiSlider:any;
declare let $:any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewInit, AfterContentInit, OnChanges {
  private nouislider;
  private range = {min:0,max:0};
  private loaded = 0;
  private loading = false;
  private areas = [];
  private posts:Post[] = [];
  private CURRENCY = GLOBAL_VAR.CURRENCY;
  private PRODUCTS = [];
  private ctgrCount = 0;
  private currencyObj ;
  private filter = {
    title:undefined,
    area:undefined,
    currency:undefined,
    category:undefined,
    range:undefined,
  };
  private filterMode = false;
  constructor(
    @Inject(PostService) private postSV,
    @Inject(AreaService) private areaSV){ 
    this.onGetPost();
    //get all area
    this.areaSV.getAllAreas().subscribe( data => {
      this.areas = data;
     this.formatProductsArr();
    })
    //get min max cost of product
    //default currency is USD
    this.postSV.getMinMaxCost().subscribe( data => {
      this.currencyObj = data;
      console.log(this.currencyObj)
      this.onCreateSlider('USD');
    })
  }
  //if user scroll to the bottom of page
  //load more 5 posts
  @HostListener('window:scroll',[])
  onscroll(){
    let body = document.body,
      html = document.documentElement;
    
    let height = Math.max(body.scrollHeight, body.offsetHeight,
      html.clientHeight, html.scrollHeight, html.offsetHeight);

    if((window.innerHeight + window.scrollY) >= height){
      if(this.filterMode){

      }
      else{
        this.loading = true;
        this.onGetPost();
      } 
    }
  }
  
  ngAfterViewInit(){
    
    $('.ui.dropdown').dropdown();
  }

  onFindPost(){
    this.filter.title = $("#titleSearchInp").val();
    //set the cost range
    let range = document.getElementsByClassName("noUi-tooltip");
    this.range.min = Number.parseFloat(range[0].textContent);
    this.range.max = Number.parseFloat(range[1].textContent);
    this.filter.range = this.range;
    this.filterMode = true;
    console.log(this.filter);
  }
  //get posts
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

  

  onCurrencySelect(currency){
    this.onUpdateSlider(currency);
    this.filter.currency = currency;
    console.log(currency);
  }

  onAreaSelect(area){
    this.filter.area = area;
    console.log(area);
  }

  onCategorySelect(category){
    this.filter.category = category;
  }
  //create slider for cost range
  onCreateSlider(currencyName){
    this.nouislider = noUiSlider();
    let slider = document.getElementById('slider');
    if(this.currencyObj !== undefined){
      let currency = {
        min:this.currencyObj[currencyName].min,
        max:this.currencyObj[currencyName].max,
      }
      this.nouislider.create(slider, {
        start: [currency.min, currency.max],
        connect: true,
        range: {
          'min': currency.min,
          'max': currency.max
        },
        tooltips:true,
        pips: {
          mode: 'values',
          values: [currency.max/2,currency.max/4,currency.max*3/4],
        }
      },true); 
    }
  }
  //update slider
  onUpdateSlider(currencyName){
    $("#slider")[0].noUiSlider.destroy()
    this.onCreateSlider(currencyName);
  }

  ngOnInit() {
  }

  ngAfterContentInit(){
  }

  ngOnChanges(changes:SimpleChanges){
  }


}
