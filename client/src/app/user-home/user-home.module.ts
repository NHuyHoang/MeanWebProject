import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserHomeComponent } from './user-home.component';
import { PostService,AreaService,CategoryService } from '../shared-service/shared-service'
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PostCreatingComponent } from './post-creating/post-creating.component';
import { RouterModule } from '@angular/router';//import this to use router-outlet
import { UserPostComponent } from './user-post/user-post.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductModule } from './post-creating/product-form/product.module';
import { User_ROUTING } from './user-home.route';

@NgModule({
    declarations:[ 
        UserHomeComponent, 
        PostCreatingComponent, 
        UserPostComponent 
     ],
    imports:[ 
        CommonModule, 
        MinifiedPostModule, 
        RouterModule,FormsModule,
        SharedModule,
        ProductModule,
        ReactiveFormsModule,
        User_ROUTING
    ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}