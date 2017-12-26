import { Component, OnInit, Input, AfterViewInit, AfterViewChecked, OnChanges, SimpleChanges } from '@angular/core';
import { GLOBAL_VAR } from '../../../../shared-service/shared-service';
declare var $: any;
@Component({
  selector: 'general-product',
  templateUrl: './general-product.component.html',
  styleUrls: ['./general-product.component.css']
})
export class GeneralProductComponent implements OnChanges, OnInit, AfterViewInit, AfterViewChecked {
  @Input('generalInfo') private generalInfo;
  @Input('id') id;
  private CUR = GLOBAL_VAR.CURRENCY;
  constructor() { }

  ngOnInit() {
    if (this.generalInfo !== undefined) {

    }

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['id'].currentValue !== undefined) {
      this.generalInfo.controls['currency'].setValue('USD');
      this.generalInfo.controls['payment_method'].setValue('Direct dealing');
    }
  }
  ngAfterViewInit() {
    $('.ui.dropdown').dropdown({})
  }

  ngAfterViewChecked() {
    this.generalInfo.controls['guarantee']
      .setValue($('.guarantee_dropdown').dropdown('get value') == "true");
  }

  

  onCurrencySelect(selection){
    this.generalInfo.controls['currency'].setValue(selection);
  }

  onPayMethodSelect(selection){
    this.generalInfo.controls['payment_method'].setValue(selection);
  }

  onReturnBoolean(value){
    return value==="true"?true:false
  }
}
