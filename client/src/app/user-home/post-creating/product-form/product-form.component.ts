import {
  Component,
  OnInit, Input,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  ComponentFactory,
  ComponentRef,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  Inject,
  OnDestroy
} from '@angular/core';

import { GLOBAL_VAR, ProductService } from '../../../shared-service/shared-service';
import { ProductBicycleComponent } from './specific-product/product-bicycle/product-bicycle.component';
import { ProductCameraComponent } from './specific-product/product-camera/product-camera.component';
import { ProductLaptopComponent } from './specific-product/product-laptop/product-laptop.component';
import { ProductCarComponent } from './specific-product/product-car/product-car.component';
import { ProductMotorComponent } from './specific-product/product-motor/product-motor.component';
import { ProductMobileComponent } from './specific-product/product-mobile/product-mobile.component';
import { ProductTabletComponent } from './specific-product/product-tablet/product-tablet.component';
import { EstateComponent } from './specific-product/estate/estate.component'
import { ElectronicComponent } from './specific-product/electronic/electronic.component';
import { VehicleComponent } from './specific-product/vehicle/vehicle.component';
import { SpecProductService } from './specific-product/spec-product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Mobile } from '../../../../models/Product-child/Products-module';
import { Product } from '../../../../models/Product';
import { Estate } from '../../../../models/Estate';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  entryComponents: [
    ProductMobileComponent,
    ProductTabletComponent,
    ProductBicycleComponent,
    ProductCameraComponent,
    ProductLaptopComponent,
    ProductCarComponent,
    ProductMotorComponent,
    EstateComponent,
    ElectronicComponent,
    VehicleComponent
  ],
})
export class ProductFormComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input('id') id;
  @ViewChild("productForm", { read: ViewContainerRef }) container;
  private form;
  private categoryId = GLOBAL_VAR.PRODUCT_ID;
  private componentRef: ComponentRef<any>;
  private model;
  constructor(
    private resolver: ComponentFactoryResolver,
    private formbuilder: FormBuilder,
    @Inject(SpecProductService) private specProductSv,
    @Inject(ProductService) private productSv) {

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['id'].currentValue !== undefined) {
      this.model = this.productSv.getNullProduct(this.id);
      if (this.id !== 'est') {
        if (this.model.specificInfo !== undefined) {
          this.form = this.formbuilder.group({
            'generalInfo': this.formbuilder.group(this.onCreateProductForm()),
            'specificInfo': this.formbuilder.group(this.model.specificInfo)
          })
        }
        else {
          this.form = this.formbuilder.group({
            'generalInfo': this.formbuilder.group(this.onCreateProductForm()),
            'specificInfo': this.formbuilder.group({})
          })
        }
        this.form.controls['generalInfo'].controls['_type'].setValue(this.id);
        this.form.controls['generalInfo'].controls['imglist'].setValue([]);
      }
      else {
        this.form = this.formbuilder.group(this.onCreateEstForm());
      }
      this.form.controls['generalInfo'].controls['sold'].value = false;
      this.createComponent(this.id);
      this.specProductSv.setForm(this.id, this.form);
    }
  }



  createComponent(component) {
    this.container.clear();
    let factory: ComponentFactory<any>;
    switch (component) {
      case (this.categoryId.mobile):
        factory = this.resolver.resolveComponentFactory(ProductMobileComponent); break;
      case (this.categoryId.tablet):
        factory = this.resolver.resolveComponentFactory(ProductTabletComponent); break;
      case (this.categoryId.bicycle):
        factory = this.resolver.resolveComponentFactory(ProductBicycleComponent); break;
      case (this.categoryId.camera):
        factory = this.resolver.resolveComponentFactory(ProductCameraComponent); break;
      case (this.categoryId.car):
        factory = this.resolver.resolveComponentFactory(ProductCarComponent); break;
      case (this.categoryId.laptop):
        factory = this.resolver.resolveComponentFactory(ProductLaptopComponent); break;
      case (this.categoryId.motor):
        factory = this.resolver.resolveComponentFactory(ProductMotorComponent); break;
      /* case (this.categoryId.another_electronics):
        factory = this.resolver.resolveComponentFactory(ElectronicComponent); break;
      case (this.categoryId.another_vehicle):
        factory = this.resolver.resolveComponentFactory(VehicleComponent); break; */
      case ("est"):
        factory = this.resolver.resolveComponentFactory(EstateComponent); break;

    }
    if (factory !== undefined) {
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.id = component;
      this.componentRef.instance.specificInfo = this.form.controls['specificInfo'];
    }

  }

  getImgUploaded(event) {
    this.form.controls['generalInfo'].controls['imglist'].setValue(event);
  }

  ngOnDestroy() {
    console.log("destroyed");
    this.specProductSv.destroyForm(this.id);
  }

  onCreateEstForm() {
    return {
      'generalInfo': this.formbuilder.group({
        'imglist': [[]],
        'sold': [false],
        'categoryid': 'est'
      }),
      'specificInfo': this.formbuilder.group({
        'address': [],
        'location':[{
          "log" : "",
          "lat" : ""
        }],
        '_type': [],
        'registered_owner': [true],
        'furniture_include': [true],
        'state': [],
        'description': [],
        'leasecontract': this.formbuilder.group({
          'typecontract': [GLOBAL_VAR.PRODUCT_ID['lease estate'], Validators.required],
          'deposit': [, Validators.required],
          'cost': [, Validators.required],
          'contract_duration': [, Validators.required],
          'currency': ["USD", Validators.required]
        }),
        'salecontract': this.formbuilder.group({
          'typecontract': [GLOBAL_VAR.PRODUCT_ID['sale estate'], Validators.required],
          'land_certificate': [true, Validators.required],
          'cost': [, Validators.required],
          'ownership_certificate': [true, Validators.required],
          'payment_method': [, Validators.required],
          'currency': ["USD", Validators.required]
        })
      }),
    }
  }

  onCreateProductForm() {
    let product = new Product();
    for(let key in product){
      if(key == "categoryid" || key == "imglist")
       continue;
      product[key] = [,Validators.required]
    }
    return product;
  }

}
