import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecPostComponent } from './spec-post.component';
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PostHolderComponent } from './post-holder/post-holder.component';
import { PostCommentComponent } from './post-holder/post-comment/post-comment/post-comment.component';
import { SharedServiceModule } from '../shared-service/shared-service.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations:[ SpecPostComponent, PostHolderComponent, PostCommentComponent ],
    imports:[ CommonModule, MinifiedPostModule, SharedServiceModule, ReactiveFormsModule],
    providers:[ ]
})
export class SpecPostModule{}