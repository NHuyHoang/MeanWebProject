import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { UploadImgModule } from '../../../upload-image/upload-image.module';
import { SpecProductModule } from './specific-product/spec.product.module';
import { SpecProductService } from './specific-product/spec-product.service';

@NgModule({
    declarations:[ProductFormComponent],
    imports:[CommonModule,UploadImgModule,SpecProductModule],
    exports:[ProductFormComponent],
    providers:[SpecProductService]
})
export class ProductModule{}