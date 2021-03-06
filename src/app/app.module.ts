import { BrowserModule } from '@angular/platform-browser';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { RecaptchaModule } from 'ng-recaptcha';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { UiSwitchModule } from 'angular2-ui-switch';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// import components
import { AppComponent } from './modules/Task/app.component';
import { LoginComponent } from './modules/login/login.component';
import { TaskmodalComponent } from './modules/Task/taskmodal/taskmodal.component';
import { HeaderComponent } from './modules/header/header.component';
import { BookstoreComponent } from './modules/bookstore/bookstore.component';
import { RegisterComponent } from './modules/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { UsersComponent } from './modules/users/users.component';
import { UsermodalComponent } from './modules/users/usermodal/usermodal.component';
import { UserprofileComponent } from './modules/userprofile/userprofile.component';

// import services
import { TaskService } from './services/task/task.service';
import { BookstoreService } from './services/bookstore/bookstore.service';
import { UserService } from './services/user/user.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: UserprofileComponent },
  { path: 'task', component: AppComponent },
  { path: 'bookstore', component: BookstoreComponent },
  { path: 'users', component: UsersComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    TaskmodalComponent,
    HeaderComponent,
    BookstoreComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    UserprofileComponent,
    UsersComponent,
    UsermodalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    RecaptchaModule.forRoot(),
    FormsModule,
    DataTablesModule,
    ModalModule.forRoot(),
    RouterModule.forRoot(routes, { enableTracing: false }),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    UiSwitchModule
  ],

  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthService,
      multi: true
    },
    TaskService, UserService, AuthService, BookstoreService

  ],
  bootstrap: [HeaderComponent],
  entryComponents: [TaskmodalComponent, UsermodalComponent]
})

export class AppModule { }

