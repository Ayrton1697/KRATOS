import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';

//Importar componentes
import {AdminComponent} from './components/admin/admin.component';
import {HomeComponent} from './components/home/home.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {ErrorComponent} from './components/error/error.component';
import { ResourcesComponent } from './components/resources/resources.component';
import { MachinesComponent } from './components/machines/machines.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmResetPasswordComponent } from './components/confirm-reset-password/confirm-reset-password.component';
import { IdentityGuard } from './identity-guard.guard';
import { ConfirmSignUpComponent } from './components/confirm-sign-up/confirm-sign-up.component';
import { StorageComponent } from './components/storage/storage.component';
import { S3Component } from './components/s3/s3.component';
import { MachinesAllComponent } from './components/machines-all/machines-all.component';
import { MachinesSalesComponent } from './components/machines-sales/machines-sales.component';

//Guard
/* import {IdentityGuard} from './services/identity.guard'; */

//Definir rutas
const appRoutes :Routes=[
   {path : '', component: HomeComponent,canActivate:[IdentityGuard]},
   {path : 'admin', component: AdminComponent},
   {path : 'login' ,component:LoginComponent},
   {path : 'register' ,component:RegisterComponent},
   {path : 'resources' ,component:ResourcesComponent,canActivate:[IdentityGuard]},
   {path : 'storage' ,component:StorageComponent,canActivate:[IdentityGuard]},
   {path : 'resetPassword' ,component:ResetPasswordComponent},
   {path : 'confirmResetPassword' ,component:ConfirmResetPasswordComponent},
   {path : 'confirmSignUp' ,component:ConfirmSignUpComponent},
   {path : 'machines' ,component: MachinesComponent, canActivate:[IdentityGuard]},
   {path : 'machinesAll' ,component: MachinesAllComponent, canActivate:[IdentityGuard]},
   {path : 'machinesSales' ,component: MachinesSalesComponent, canActivate:[IdentityGuard]},
   {path : 'S3' ,component: S3Component, canActivate:[IdentityGuard]},
   {path : '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 


/* {path : 'admin', component: AdminComponent, canActivate:[IdentityGuard]}, */