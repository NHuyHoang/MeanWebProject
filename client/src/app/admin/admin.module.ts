import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdManageUserComponent } from './admin.manage-user/admin.manage-user.component';
import { AdManagePostComponent } from './admin.manage-post/admin.manage-post.component';
import { PrivatePostService } from './private-services/private-post.service';
import { MinifiedPostModule } from '../minified-post/minified-post.module';
import { PrivateUserService } from './private-services/private-user.service';

@NgModule({
    declarations:[ AdminComponent, AdManageUserComponent, AdManagePostComponent ],
    imports:[ CommonModule,RouterModule,MinifiedPostModule ],
    exports:[],
    providers:[PrivatePostService,PrivateUserService]
})
export class AdminModule{}