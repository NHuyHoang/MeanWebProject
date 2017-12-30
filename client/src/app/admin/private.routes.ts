import { Routes, RouterModule } from '@angular/router'
import { AdManagePostComponent } from './admin.manage-post/admin.manage-post.component';
import { AdManageUserComponent } from './admin.manage-user/admin.manage-user.component';

export const  PrivateRoutes:Routes = [
    {path:"user", component:AdManageUserComponent},
    {path:"post", component:AdManagePostComponent}
] 

