import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/mainpage.module';
import { LoginPageModule } from './login-page/loginpage.module';
import { UserHomeModule } from './user-home/user-home.module'
import { DateTimeFormatService, InterceptedHttpProvider } from './shared-service/shared-service'
import { SpecPostModule } from './spec-post/spec-post.module';
import { PostModule } from './post/post.module';
import { VisitUserModule } from './visit-user/visit-user.module';
import { LoginGuard } from './shared-service/login.guard';
import { LoginPageService } from './login-page/login-page.service';
import { AdminModule } from './admin/admin.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainPageModule,
    LoginPageModule,
    UserHomeModule,
    APP_ROUTING,
    HttpModule,
    SpecPostModule,
    PostModule,
    VisitUserModule,
    AdminModule
  ],
  providers: [Title, DateTimeFormatService, LoginGuard, LoginPageService, InterceptedHttpProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
