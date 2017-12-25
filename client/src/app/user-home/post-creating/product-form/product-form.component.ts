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
  AfterViewInit

} from '@angular/core';

import { GLOBAL_VAR } from '../../../shared-service/shared-service';
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
export class ProductFormComponent implements OnInit, OnChanges, AfterViewInit {
  @Input('id') id;
  @ViewChild("productForm", { read: ViewContainerRef }) container;
  private categoryId = GLOBAL_VAR.PRODUCT_ID;

  private componentRef: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver, private specProductSV:SpecProductService) { 
    
  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.specProductSV.getForm().valueChanges.subscribe(value => console.log(value));
  }

  ngOnChanges(change: SimpleChanges) {
    if (change['id'].currentValue !== undefined) {

      this.createComponent(this.id);
      console.log(this.id);

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
      case (this.categoryId.another_electronics):
        factory = this.resolver.resolveComponentFactory(ElectronicComponent); break;
        case (this.categoryId.another_vehicle):
        factory = this.resolver.resolveComponentFactory(VehicleComponent); break;
      case ("est"):
        factory = this.resolver.resolveComponentFactory(EstateComponent); break;

    }
    if (factory !== undefined)
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.id = component;
  }

  ngOnDestroy() {
  }

}
