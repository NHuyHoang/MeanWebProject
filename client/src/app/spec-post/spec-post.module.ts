import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecPostComponent } from './spec-post.component';
import { PostHolderComponent } from './post-holder/post-holder.component';
import { SignInManageService } from '../shared-service/sign-in-manage.service';
@NgModule({
    declarations:[ SpecPostComponent, PostHolderComponent ],
    imports:[ CommonModule ],
    providers:[ SignInManageService]
})
export class SpecPostModule{}