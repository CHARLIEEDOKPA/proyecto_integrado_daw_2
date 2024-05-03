import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {component:LoginComponent,path:"login"},
    {component:MainComponent,path:"main"}
];
