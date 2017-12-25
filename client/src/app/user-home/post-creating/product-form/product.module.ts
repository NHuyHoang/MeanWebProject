import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';
import { UploadImgModule } from '../../../upload-image/upload-image.module';
import { SpecProductModule } from './specific-product/spec.product.module';
import { SpecProductService } from './specific-product/spec-product.service';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralProductComponent } from './general-product/general-product.component';
import { CKEditorModule } from 'ng2-ckeditor/lib/src/ckeditor.module';

@NgModule({
    declarations:[ProductFormComponent, GeneralProductComponent],
    imports:[CommonModule,UploadImgModule,SpecProductModule,ReactiveFormsModule,CKEditorModule],
    exports:[ProductFormComponent],
    providers:[SpecProductService]
})
export class ProductModule{}