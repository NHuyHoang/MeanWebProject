import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-product-car',
  templateUrl: './product-car.component.html',
  styleUrls: ['./product-car.component.css']
})
export class ProductCarComponent implements OnInit,AfterViewChecked {
  @Input('specificInfo') specificInfo;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(){
    this.specificInfo.controls['origin']
      .setValue($('.original_dropdown').dropdown('get value') =="true");
  }

}
