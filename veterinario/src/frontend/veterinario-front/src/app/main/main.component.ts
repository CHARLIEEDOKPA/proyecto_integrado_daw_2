import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';
import { Credentials } from '../credentials';
import { DuenyoComponent } from "../duenyo/duenyo.component";

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrl: './main.component.css',
    imports: [NavbarComponent, DuenyoComponent]
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
            console.log(this.credentials)
        } catch (error) {
            console.log("Puede que no haya token o que el token tiene un mal formato")
            this.router.navigate(['/login'])
        }
        
        
    }

}
