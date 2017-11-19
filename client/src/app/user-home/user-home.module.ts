import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../shared-service/post.service'

import { UserHomeComponent } from './user-home.component';
import { MinifiedPostComponent } from '../minified-post/minified-post.component';
import { ProductInfoComponent } from '../minified-post/product-info/product-info.component';
import { AreaService } from '../shared-service/area.service';
import { CategoryService } from '../shared-service/category.service';
@NgModule({
    declarations:[ UserHomeComponent, MinifiedPostComponent, ProductInfoComponent ],
    imports:[ CommonModule ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}