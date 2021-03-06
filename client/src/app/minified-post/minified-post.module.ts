import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MinifiedPostComponent } from './minified-post.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SharedModule } from '../../shared-module/shared.module';
import { SharedServiceModule } from '../shared-service/shared-service.module';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations:[ MinifiedPostComponent, ProductInfoComponent],
    imports:[CommonModule,SharedModule,SharedServiceModule, FormsModule],
    exports:[MinifiedPostComponent],
    providers:[]
})
export class MinifiedPostModule{}