import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../shared-service/post.service'

import { UserHomeComponent } from './user-home.component';
import { AreaService } from '../shared-service/area.service';
import { CategoryService } from '../shared-service/category.service';
import { MinifiedPostModule } from '../minified-post/minified-post.module';
@NgModule({
    declarations:[ UserHomeComponent ],
    imports:[ CommonModule, MinifiedPostModule ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}