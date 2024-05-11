import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MascotaComponent } from './mascota/mascota.component';
import { IncidenciaReportComponent } from './incidencia-report/incidencia-report.component';

export const routes: Routes = [
    {component:MainComponent,path:""},
    {component:LoginComponent,path:"login"},
    {component:MainComponent,path:"main"},
    {component:MascotaComponent,path:"mascota/:id"},
    {component:IncidenciaReportComponent, path:"report/:id"}
];
