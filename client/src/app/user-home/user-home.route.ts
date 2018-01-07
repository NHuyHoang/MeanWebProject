import { Routes, RouterModule } from '@angular/router'
import { PostCreatingComponent } from './post-creating/post-creating.component';
import { UserPostComponent } from './user-post/user-post.component';
import { UserHomeComponent } from './user-home.component';


const UserHomeRoutes: Routes = [
    {
        path: '', component: UserHomeComponent, children: [
            { path: 'post-create', component: PostCreatingComponent },
            { path: 'post', component: UserPostComponent }
        ]
    }
];

export const User_ROUTING = RouterModule.forChild(UserHomeRoutes)