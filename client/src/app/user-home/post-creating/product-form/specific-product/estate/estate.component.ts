import { Component, OnInit, Input, OnChanges, AfterViewInit, AfterViewChecked } from '@angular/core';
import { GLOBAL_VAR } from '../../../../../shared-service/shared-service';
declare var $: any
@Component({
  selector: 'app-estate',
  templateUrl: './estate.component.html',
  styleUrls: ['./estate.component.css']
})
export class EstateComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {
  @Input('specificIfno') specificInfo;
  private type = [false, false];
  private CUR = GLOBAL_VAR.CURRENCY;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {
    $('.ui.dropdown').dropdown();
    $('.currency_dropdown').dropdown('set value',"USD");
    $('.payment_dropdown').dropdown('set value',"Direct dealing");
  }

  ngAfterViewChecked() {
    this.specificInfo.controls['registered_owner']
      .setValue($('.registered_dropdown').dropdown('get value') == "true");
    this.specificInfo.controls['furniture_include']
      .setValue($('.furniture_dropdown').dropdown('get value') == "true");

    this.specificInfo.controls['salecontract']
      .controls['land_certificate']
      .setValue($('.land_dropdown').dropdown('get value') == "true");

    this.specificInfo.controls['salecontract']
      .controls['ownership_certificate']
      .setValue($('.owner_dropdown').dropdown('get value') == "true");
    this.specificInfo.controls['_type']
      .setValue($('.estProduct_dropdown').dropdown('get value'));
    this.specificInfo.controls['salecontract']
      .controls['payment_method']
      .setValue($('.payment_dropdown').dropdown('get value'));
  }

  onSelectContract(number) {
    this.type[number] = !this.type[number];
  }

  onCurrencySelect(type, selection) {
    if (type == 0) {
      this.specificInfo.controls['leasecontract'].controls['currency'].setValue(selection);
    } else
      this.specificInfo.controls['salecontract'].controls['currency'].setValue(selection);
  }

  onPayMethodSelect(selection) {
    this.specificInfo.controls['salecontract'].controls['payment_method'].setValue(selection);
  }
}
