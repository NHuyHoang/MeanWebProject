import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post.component';

const routes : Routes = [
    {path:'', component: PostComponent}
]

export const POST_ROUTING = RouterModule.forChild(routes);