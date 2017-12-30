import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { AdManageUserComponent } from './admin.manage-user/admin.manage-user.component';
import { AdManagePostComponent } from './admin.manage-post/admin.manage-post.component';
import { PrivatePostService } from './private-services/private-post.service';
import { SpecInfoComponent } from './admin.manage-post/spec-info/spec-info.component';
import { MinifiedPostComponent } from '../minified-post/minified-post.component';
import { MinifiedPostModule } from '../minified-post/minified-post.module';

@NgModule({
    declarations:[ AdminComponent, AdManageUserComponent, AdManagePostComponent, SpecInfoComponent ],
    imports:[ CommonModule,RouterModule,MinifiedPostModule ],
    exports:[],
    providers:[PrivatePostService]
})
export class AdminModule{}