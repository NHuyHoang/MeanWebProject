import { Component, OnInit, OnChanges, Input, Inject, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Camera } from '../../../models/Product-child/Camera';
import { Estate } from '../../../models/Estate';
import { Product } from '../../../models/Product';
import { ProductService } from '../../shared-service/shared-service';
import { Bicycle } from '../../../models/Product-child/Products-module';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit,OnChanges {
  private loaded = false;
  private carouselId = this.generateUID();
  @Input('product') product;
  @Input('cmtCount') cmtCount;
  @Input('isSpec') isSpec = "";
  private keys;
  constructor(private http:Http, @Inject(ProductService) private productSV) {
    
  }

  ngOnChanges(changes:SimpleChanges){
    
    if(changes['product'] !==undefined && changes['product'].currentValue._id !== undefined){
      //get the prototype of product
      
      this.product = this.productSV.getPrototype(this.product);
      if(this.product.categoryid !== "est")
        this.keys = Object.keys(this.product.specificInfo);
      else {
        this.keys = {
          info:[],
          leaseKey:undefined,
          saleKey:undefined
        };
        if(this.product.hasOwnProperty("leasecontract")){
          this.keys.leaseKey = Object.keys(this.product.leasecontract);
          this.keys.leaseKey.shift();
        }
        if(this.product.hasOwnProperty("salecontract")){
          this.keys.saleKey = Object.keys(this.product.salecontract);
          this.keys.saleKey.shift();
        }
        this.keys.info = ["_type","address","registered_owner","state","furniture_include"];
      }
    }
  }

  ngOnInit() {
    
  }

  onLoad(){
    this.loaded = true;
    alert('success');
  }

  onNavigate(){
    return false;
  }

  onShowSpecInfo(){
    if(this.isSpec === undefined) return;
    
  }

  typeofBoolean(value){
    return typeof(value) === "boolean";
  } 

  generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
