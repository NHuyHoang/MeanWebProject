import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MinifiedPostComponent } from './minified-post.component';
import { AreaService } from '../shared-service/area.service';
import { ProductInfoComponent } from './product-info/product-info.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductService } from '../shared-service/product.service';


@NgModule({
    declarations:[ MinifiedPostComponent, ProductInfoComponent],
    imports:[CommonModule,SharedModule],
    exports:[MinifiedPostComponent],
    providers:[AreaService,ProductService]
})
export class MinifiedPostModule{}