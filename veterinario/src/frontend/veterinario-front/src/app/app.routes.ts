import { DoctorCrearComponent } from './doctor-crear/doctor-crear.component';
import { RecomendacionViewComponent } from './recomendacion-view/recomendacion-view.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MascotaComponent } from './mascota/mascota.component';
import { IncidenciaReportComponent } from './incidencia-report/incidencia-report.component';
import { NotificacionComponent } from './notificacion/notificacion.component';
import { IncidenciaComponent } from './incidencia/incidencia.component';
import { RecomendacionComponent } from './recomendacion/recomendacion.component';
import { CitasComponent } from './citas/citas.component';
import { MascotaCrudComponent } from './mascota-crud/mascota-crud.component';
import { DoctorCrudComponent } from './doctor-crud/doctor-crud.component';
import { DuenyoCrudComponent } from './duenyo-crud/duenyo-crud.component';
import { MascotaDetalleComponent } from './mascota-detalle/mascota-detalle.component';
import { MascotaEditarComponent } from './mascota-editar/mascota-editar.component';
import { MascotaCrearComponent } from './mascota-crear/mascota-crear.component';
import { DuenyoDetalleComponent } from './duenyo-detalle/duenyo-detalle.component';
import { DuenyoEditarComponent } from './duenyo-editar/duenyo-editar.component';
import { DuenyoCrearComponent } from './duenyo-crear/duenyo-crear.component';
import { DoctorDetalleComponent } from './doctor-detalle/doctor-detalle.component';
import { DoctorEditarComponent } from './doctor-editar/doctor-editar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { AddPublicacionComponent } from './add-publicacion/add-publicacion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { DuenyosBrowserComponent } from './duenyos-browser/duenyos-browser.component';

export const routes: Routes = [
    {component:MainComponent,path:""},
    {component:LoginComponent,path:"login"},
    {component:MainComponent,path:"main"},
    {component:MascotaComponent,path:"mascota/:id"},
    {component:IncidenciaReportComponent, path:"report/:id"},
    {component:NotificacionComponent, path:"notificaciones"},
    {component:IncidenciaComponent, path:"incidencia/:id"},
    {component:RecomendacionComponent, path:"recomendacion/:id"},
    {component:RecomendacionViewComponent, path:"recomendacion/view/:id"},
    {component:CitasComponent, path:"citas"},
    {component:MascotaCrudComponent, path:"mascota-crud"},
    {component:DoctorCrudComponent, path:"doctor-crud"},
    {component:DuenyoCrudComponent, path:"duenyo-crud"},
    {component: MascotaDetalleComponent, path:"mascota-crud/detalle/:id"},
    {component:MascotaEditarComponent, path:"mascota-crud/editar/:id"},
    {component:MascotaCrearComponent, path:"mascota-crud/crear"},
    {component:DuenyoDetalleComponent,path:"duenyo-crud/detalle/:id"},
    {component:DuenyoEditarComponent, path:"duenyo-crud/editar/:id"},
    {component:DuenyoCrearComponent, path:"duenyo-crud/crear"},
    {component:DoctorDetalleComponent,path:"doctor-crud/detalle/:id"},
    {component:DoctorEditarComponent, path:"doctor-crud/editar/:id"},
    {component:DoctorCrearComponent, path:"doctor-crud/crear"},
    {component:ChangePasswordComponent, path:"change-password"},
    {component:PublicacionesComponent, path:"publicaciones/:id"},
    {component:AddPublicacionComponent, path:"add-publicacion"},
    {component:PublicacionComponent, path:"publicacion/:id"},
    {component:DuenyosBrowserComponent,path:"result/:pattern"}
];
