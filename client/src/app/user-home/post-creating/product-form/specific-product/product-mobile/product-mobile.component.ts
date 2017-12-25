import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecProductService } from '../spec-product.service';

@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.css']
})
export class ProductMobileComponent implements OnInit, OnChanges {
  @Input('id') id;
  @Input('specificInfo') specificInfo: FormGroup;
  constructor(private formbuilder: FormBuilder, private specProductSV: SpecProductService) {

  }

  ngOnInit() {
  }

  ngOnChanges(change: SimpleChanges) {
  }

  onSubmit() {
    console.log(this.specificInfo.controls);
  }

}
