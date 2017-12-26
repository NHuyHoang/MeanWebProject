import { Component, Input, AfterViewChecked } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-product-tablet',
  templateUrl: './product-tablet.component.html',
  styleUrls: ['./product-tablet.component.css']
})
export class ProductTabletComponent implements AfterViewChecked {
  @Input('specificInfo') specificInfo;
  constructor() { 
    
  }

  ngAfterViewChecked(){
    if(this.specificInfo !== undefined){
      this.specificInfo
        .controls['simcard']
        .setValue($('.sim_dropdown').dropdown('get value') == "true")
    }
  }

}
