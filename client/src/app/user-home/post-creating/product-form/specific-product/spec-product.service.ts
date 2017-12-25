import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class SpecProductService {
  private form:FormGroup;
  constructor() { }

  setForm(form:FormGroup){
    this.form = form;
    //this.form.valueChanges.subscribe(value => value);
  }

  getForm():FormGroup{
    return this.form;
  }
}
