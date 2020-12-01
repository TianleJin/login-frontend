import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { AuthenticationService } from './services/authentication.service';
import { DatabaseService } from './services/database.service';
import { ValidatorService } from './services/validator.service';
import { LoginGuardService } from './services/login-guard.service';
import { LoginStateService } from './services/login-state.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    DatabaseService,
    AuthenticationService,
    ValidatorService,
    LoginGuardService,
    LoginStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
