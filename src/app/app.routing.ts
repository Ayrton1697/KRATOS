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

//Guard
/* import {IdentityGuard} from './services/identity.guard'; */

//Definir rutas
const appRoutes :Routes=[
   {path : '', component: HomeComponent},
   {path : 'admin', component: AdminComponent},
   {path : 'login' ,component:LoginComponent},
   {path : 'register' ,component:RegisterComponent},
   {path : 'resources' ,component:ResourcesComponent},
   {path : 'machines' ,component: MachinesComponent},
   {path : '**', component: ErrorComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes); 


/* {path : 'admin', component: AdminComponent, canActivate:[IdentityGuard]}, */