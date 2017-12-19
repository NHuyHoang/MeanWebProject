import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { UserHomeComponent } from './user-home.component';
import { PostService,AreaService,CategoryService } from '../shared-service/shared-service'
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PostCreatingComponent } from './post-creating/post-creating.component';
import { RouterModule } from '@angular/router';//import this to use router-outlet
import { UserPostComponent } from './user-post/user-post.component';
@NgModule({
    declarations:[ UserHomeComponent, PostCreatingComponent, UserPostComponent ],
    imports:[ CommonModule, MinifiedPostModule, RouterModule ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}