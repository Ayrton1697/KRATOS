import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {routing, appRoutingProviders} from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AdminComponent } from './components/admin/admin.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule } from '@angular/material/form-field';
import { MatFormFieldControl } from '@angular/material/form-field';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MachinesComponent } from './components/machines/machines.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { PocsComponent } from './components/pocs/pocs.component';
import { DialogOverviewExampleDialog } from './components/machines/machines.component';
import { OptionsDialogOverviewExampleDialog } from './components/machines/machines.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/confirm-reset-password.component';
import { ConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { StorageComponent } from './components/storage/storage.component';
import { S3Component } from './components/s3/s3.component';
import { MachinesAllComponent } from './components/machines-all/machines-all.component';
import { MachinesSalesComponent } from './components/machines-sales/machines-sales.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ErrorComponent,
    HomeComponent,
    ResourcesComponent,
    MachinesComponent,
    DialogComponent,
    PocsComponent,
    DialogOverviewExampleDialog,
    OptionsDialogOverviewExampleDialog,
    NavbarComponent,
    ResetPasswordComponent,
    ConfirmResetPasswordComponent,
    ConfirmSignUpComponent,
    StorageComponent,
    S3Component,
    MachinesAllComponent,
    MachinesSalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routing,
    BrowserAnimationsModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatTooltipModule
    
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: []
})
export class AppModule { }
