import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { UserHomeComponent } from './user-home/user-home.component';

const ROUTES:Routes = [
    {path:"", component:MainPageComponent},
    {path:"login", component:LoginPageComponent},
    {path:"user", component:UserHomeComponent}
]

export const APP_ROUTING = RouterModule.forRoot(ROUTES);