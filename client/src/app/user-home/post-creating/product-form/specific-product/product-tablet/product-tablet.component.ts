import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SpecProductService } from '../spec-product.service';

@Component({
  selector: 'app-product-tablet',
  templateUrl: './product-tablet.component.html',
  styleUrls: ['./product-tablet.component.css']
})
export class ProductTabletComponent implements OnInit {
  @Input('specificInfo') specificInfo: FormGroup;
  constructor(private formbuilder: FormBuilder, private specProductSV: SpecProductService) { 
    
  }

  ngOnInit() {
    
  }

}
