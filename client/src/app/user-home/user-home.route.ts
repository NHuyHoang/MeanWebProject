import { Routes } from '@angular/router'
import { PostCreatingComponent } from './post-creating/post-creating.component';
import { UserPostComponent } from './user-post/user-post.component';


export const UserHomeRoutes : Routes = [
    {path: 'post-create', component:PostCreatingComponent},
    {path: 'post', component:UserPostComponent},
]   