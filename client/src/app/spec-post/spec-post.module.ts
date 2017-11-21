import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecPostComponent } from './spec-post.component';
import { SignInManageService } from '../shared-service/sign-in-manage.service';
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PostHolderComponent } from './post-holder/post-holder.component';


@NgModule({
    declarations:[ SpecPostComponent, PostHolderComponent ],
    imports:[ CommonModule, MinifiedPostModule],
    providers:[ SignInManageService]
})
export class SpecPostModule{}