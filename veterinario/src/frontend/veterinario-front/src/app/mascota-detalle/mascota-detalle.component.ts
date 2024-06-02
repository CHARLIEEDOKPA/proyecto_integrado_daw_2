import { Component, OnInit, inject } from '@angular/core';
import { Mascota } from '../mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from "../navbar/navbar.component";
import { JwtService } from '../jwt.service';

@Component({
    selector: 'app-mascota-detalle',
    standalone: true,
    templateUrl: './mascota-detalle.component.html',
    styleUrl: './mascota-detalle.component.css',
    imports: [DatePipe, NavbarComponent]
})
export class MascotaDetalleComponent implements OnInit{


  private route = inject(ActivatedRoute)

  private router = inject(Router)
  private jwtService = inject(JwtService)

  private mascotaService = inject(MascotaService)

  private ID =  Number(this.route.snapshot.paramMap.get("id"))
  mascota!:Mascota

  ngOnInit(): void {
    let rol = this.jwtService.returnObjectFromJSON()?.rol
    if(rol !== "administrador") {
      this.router.navigate(['main'])
    }
    this.mascotaService.getMascota(this.ID).subscribe(x => this.mascota = x,() => this.router.navigate(['mascota-crud']))
  }

}
