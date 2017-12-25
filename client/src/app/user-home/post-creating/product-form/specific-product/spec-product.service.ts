import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class SpecProductService {
  private productForm = {};
  constructor() { }

  setForm(id:string,form:FormGroup){
    this.productForm[id] = form;
  }

  getForm(id):FormGroup{
    return this.productForm[id];
  }

  getProductForm(){
    return this.productForm;
  }

  setSpecProductForm(id,form:FormGroup){
    
    if(this.productForm[id] !== undefined)
      this.productForm[id].specificInfo = form;
      console.log(this.productForm[id])
  }
}
