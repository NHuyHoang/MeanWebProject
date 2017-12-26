import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductBicycleComponent } from './product-bicycle/product-bicycle.component';
import { ProductMotorComponent } from './product-motor/product-motor.component';
import { ProductCameraComponent } from './product-camera/product-camera.component';
import { ProductCarComponent } from './product-car/product-car.component';
import { ProductLaptopComponent } from './product-laptop/product-laptop.component';
import { ProductMobileComponent } from './product-mobile/product-mobile.component';
import { ProductTabletComponent } from './product-tablet/product-tablet.component';
import { EstateComponent } from './estate/estate.component';
import { ElectronicComponent } from './electronic/electronic.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor/lib/src/ckeditor.module';

@NgModule({
    declarations:[
        ProductBicycleComponent,
        ProductCameraComponent,
        ProductCarComponent,
        ProductLaptopComponent,
        ProductMobileComponent,
        ProductMotorComponent,
        ProductTabletComponent,
        EstateComponent,
        ElectronicComponent,
        VehicleComponent,
    ],
    imports:[CommonModule, ReactiveFormsModule, CKEditorModule],
    exports:[
        ProductBicycleComponent,
        ProductCameraComponent,
        ProductCarComponent,
        ProductLaptopComponent,
        ProductMobileComponent,
        ProductMotorComponent,
        ProductTabletComponent],
    providers:[],
})
export class SpecProductModule{}