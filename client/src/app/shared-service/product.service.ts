import { Injectable } from '@angular/core';
import { GLOBAL_VAR } from './shared-variable';
import { Product } from '../../models/Product';
import { Estate } from '../../models/Estate';
import * as Prototype from '../../models/Product-child/Products-module'

@Injectable()
export class ProductService {
  constructor() { }
  getPrototype(input:any):Product|Estate{
    let productId = GLOBAL_VAR.PRODUCT_ID;
    if(input.categoryid === 'est')
      return new Estate(input);
    switch(input._type){
      case(productId.camera):
        return new Prototype.Camera(input);
      case(productId.laptop):
        return new Prototype.Laptop(input);
      case(productId.bicycle):
        return new Prototype.Bicycle(input);
      case(productId.car):
        return new Prototype.Car(input);
      case(productId.mobile):
        return new Prototype.Mobile(input);
      case(productId.motor):
        return new Prototype.Motor(input);  
      case(productId.tablet):
        return new Prototype.Tablet(input); 
      default: return new Product(input); 
    }
  }

}
