import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';


import { MinifiedPostComponent } from './minified-post.component';
import { AreaService } from '../shared-service/area.service';
import { ProductInfoComponent } from './product-info/product-info.component';


@NgModule({
    declarations:[ MinifiedPostComponent, ProductInfoComponent ],
    imports:[CommonModule],
    providers:[AreaService]
})
export class MinifiedPostModule{}