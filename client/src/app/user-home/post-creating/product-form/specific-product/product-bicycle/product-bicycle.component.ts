import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-bicycle',
  templateUrl: './product-bicycle.component.html',
  styleUrls: ['./product-bicycle.component.css']
})
export class ProductBicycleComponent implements OnInit {
  @Input('specificInfo') specificInfo;
  constructor() { }

  ngOnInit() {
  }

}
