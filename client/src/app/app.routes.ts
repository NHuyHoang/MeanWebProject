import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { SpecPostComponent } from './spec-post/spec-post.component';
import { PostComponent } from './post/post.component';
import { AppComponent } from './app.component';
//import { UserHomeRoutes } from './user-home/user-home.route'
import { VisitUserComponent } from './visit-user/visit-user.component';
import { LoginGuard } from './shared-service/login.guard';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { OauthComponent } from './oauth.component';

const ROUTES:Routes = [
    {path:"", component:MainPageComponent},
    {path:"login", component:LoginPageComponent},
    {path:"user", loadChildren:'app/user-home/user-home.module#UserHomeModule'},
    {path:"post/:_id", component:SpecPostComponent},
    {path:"post", loadChildren:'app/post/post.module#PostModule'},
    {path:"visit/:id", component:VisitUserComponent},
    {path:'private', loadChildren:'app/admin/admin.module#AdminModule'},
    {path: 'oauth', component: OauthComponent },
    {path: '**', component: MainPageComponent },
    

]

export const APP_ROUTING = RouterModule.forRoot(ROUTES,{preloadingStrategy:PreloadAllModules});