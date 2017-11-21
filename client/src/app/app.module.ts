import { BrowserModule,Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routes';
import { AppComponent } from './app.component';
import { MainPageModule } from './main-page/mainpage.module';
import { LoginPageModule } from './login-page/loginpage.module';
import { UserHomeModule } from './user-home/user-home.module'
import { SignInManageService } from './shared-service/sign-in-manage.service';
import { DateTimeFormatService } from './shared-service/date-time-format.service';
import { SpecPostModule } from './spec-post/spec-post.module';



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
    SpecPostModule
  ],
  providers: [Title, SignInManageService, DateTimeFormatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
