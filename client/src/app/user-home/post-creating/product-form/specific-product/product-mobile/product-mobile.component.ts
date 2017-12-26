import { Component, Input, SimpleChanges } from '@angular/core';
@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.css']
})
export class ProductMobileComponent {
  @Input('specificInfo') specificInfo;
  constructor() {

  }


}
