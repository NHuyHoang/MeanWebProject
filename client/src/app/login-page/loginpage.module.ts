import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule  } from '@angular/forms'

import { LoginPageComponent} from './login-page.component';
import { LoginPageService } from './login-page.service';
import { SignInManageService } from '../shared-service/sign-in-manage.service';
import { PostService } from '../shared-service/post.service';

@NgModule({
    declarations:[
        LoginPageComponent
    ],
    imports:[
        CommonModule,
        ReactiveFormsModule
    ],
    providers:[LoginPageService, SignInManageService, PostService]
})
export class LoginPageModule {}