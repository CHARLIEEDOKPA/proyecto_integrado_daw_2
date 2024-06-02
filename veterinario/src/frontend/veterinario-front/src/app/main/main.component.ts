import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { Credentials } from '../credentials';
import { DuenyoComponent } from "../duenyo/duenyo.component";
import { DoctorComponent } from "../doctor/doctor.component";
import { AdminComponent } from "../admin/admin.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [NavbarComponent, DuenyoComponent, DoctorComponent, AdminComponent]
})

export class MainComponent implements OnInit{

    jwtService = inject(JwtService)
    router = inject(Router)
    credentials!:Credentials
    rol!:string

    ngOnInit(): void {
        try {
            this.credentials! = this.jwtService.returnObjectFromJSON()!
            this.rol = this.credentials.rol
        } catch (error) {
            this.router.navigate(['/login'])
        }
        
        
    }

}
