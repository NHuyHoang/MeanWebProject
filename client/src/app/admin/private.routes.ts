import { Routes, RouterModule } from '@angular/router'
import { AdManagePostComponent } from './admin.manage-post/admin.manage-post.component';
import { AdManageUserComponent } from './admin.manage-user/admin.manage-user.component';
import { AdminComponent } from './admin.component';

const PrivateRoutes: Routes = [
    {
        path: "", component: AdminComponent, children: [
            { path: "user", component: AdManageUserComponent },
            { path: "post", component: AdManagePostComponent }
        ]
    }
]

export const PRIVATE_ROUTING = RouterModule.forChild(PrivateRoutes);
