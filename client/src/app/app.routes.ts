import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SpecPostComponent } from './spec-post/spec-post.component';
import { PostComponent } from './post/post.component';
import { AppComponent } from './app.component';
import { UserHomeRoutes } from './user-home/user-home.route'
import { VisitUserComponent } from './visit-user/visit-user.component';
import { LoginGuard } from './shared-service/login.guard';

const ROUTES:Routes = [
    {path:"", component:MainPageComponent},
    {path:"login", component:LoginPageComponent},
    {path:"user", component:UserHomeComponent,children:UserHomeRoutes, canActivate:[LoginGuard]},
    {path:"post/:_id", component:SpecPostComponent},
    {path:"post", component:PostComponent},
    {path:"visit/:id", component:VisitUserComponent},
    {path: '**', component: MainPageComponent }
]

export const APP_ROUTING = RouterModule.forRoot(ROUTES);