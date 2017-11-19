import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  private loaded = false;
  @Input('product') product;
  constructor(private http:Http) { }

  ngOnInit() {
    
  }

  onLoad(){
    this.loaded = true;
    alert('success');
  }

}
