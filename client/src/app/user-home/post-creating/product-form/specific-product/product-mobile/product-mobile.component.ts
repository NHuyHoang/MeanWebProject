import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { SpecProductService } from '../spec-product.service';

@Component({
  selector: 'app-product-mobile',
  templateUrl: './product-mobile.component.html',
  styleUrls: ['./product-mobile.component.css']
})
export class ProductMobileComponent implements OnInit {
  @Input('id') id;
  private productForm:FormGroup;
  constructor(private formbuilder:FormBuilder,private specProductSV:SpecProductService) { 
    this.productForm = formbuilder.group({
      'id':[],
      'name':[],
    });
    specProductSV.setForm(this.productForm);
  }

  ngOnInit() {

    //this.productForm.valueChanges.subscribe(value => console.log(value));
    /* this.productForm.controls.forEach(element => {
      element.subscribe(value => console.log(value));
    }); */
  }

  onSubmit(){
    console.log(this.productForm.controls);
  }

}
