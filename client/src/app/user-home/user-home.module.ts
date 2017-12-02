import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserHomeComponent } from './user-home.component';
import { PostService,AreaService,CategoryService } from '../shared-service/shared-service'
import { MinifiedPostModule } from '../minified-post/minified-post.module';
@NgModule({
    declarations:[ UserHomeComponent ],
    imports:[ CommonModule, MinifiedPostModule ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}