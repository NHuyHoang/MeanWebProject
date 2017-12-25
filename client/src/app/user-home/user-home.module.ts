import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ng2-ckeditor';

import { UserHomeComponent } from './user-home.component';
import { PostService,AreaService,CategoryService } from '../shared-service/shared-service'
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PostCreatingComponent } from './post-creating/post-creating.component';
import { RouterModule } from '@angular/router';//import this to use router-outlet
import { UserPostComponent } from './user-post/user-post.component';
import { SharedModule } from '../../shared-module/shared.module';
import { ProductModule } from './post-creating/product-form/product.module';

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
        CKEditorModule, 
        SharedModule,
        ProductModule
    ],
    providers:[PostService, AreaService, CategoryService]
})
export class UserHomeModule{}