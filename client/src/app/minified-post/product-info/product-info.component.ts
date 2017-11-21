import { Component, OnInit, OnChanges, Input, Inject, SimpleChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Camera } from '../../../models/Product-child/Camera';
import { Estate } from '../../../models/Estate';
import { Product } from '../../../models/Product';
import { ProductService } from '../../shared-service/product.service';
import { Bicycle } from '../../../models/Product-child/Products-module';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit,OnChanges {
  private loaded = false;
  @Input('product') product;
  @Input('cmtCount') cmtCount;
  @Input('isSpec') isSpec = "";
  private keys;
  constructor(private http:Http, @Inject(ProductService) private productSV) {
    
  }

  ngOnChanges(changes:SimpleChanges){
    if(changes['product'].currentValue._id !== undefined){
      this.product = this.productSV.getPrototype(this.product);
      if(this.product.categoryid !== "est")
        this.keys = Object.keys(this.product.specificInfo);
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

}
