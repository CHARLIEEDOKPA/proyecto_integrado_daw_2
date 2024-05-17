import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota';
import { IncidenciaService } from '../incidencia.service';
import { Incidencia } from '../incidencia';
import { JwtService } from '../jwt.service';
import { CommonModule } from '@angular/common';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';

@Component({
  selector: 'app-mascota',
  standalone: true,
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css',
  imports: [NavbarComponent,CommonModule],
})
export class MascotaComponent implements OnInit {

  
  private jwtService = inject(JwtService)

  duenyo!:Duenyo

  private route = inject(ActivatedRoute);
  private duenyoService = inject(DuenyoService)

   rol!:string;

  private ID = Number(this.route.snapshot.paramMap.get('id'));

  private mascotaService = inject(MascotaService);

  private router = inject(Router);

  private incidenciaService = inject(IncidenciaService);

  mascota!: Mascota;
  
  incidencias!:Incidencia[]
  

  reportIncidencia(id: number) {
    this.router.navigate(['report',id])
  }

  ngOnInit(): void {
    this.rol = this.jwtService.returnObjectFromJSON()?.rol!
    this.mascotaService.getMascota(this.ID).subscribe(
      (x) => {
        (this.mascota = x), x;
        this.incidencias = this.mascota.incidencias
        if(this.rol == "doctor") {
        this.duenyoService.getDuenyoByIdMascota(this.mascota.id).subscribe(x => this.duenyo = x)
      }
      },
      (x) => {
        if (x.status === 401) {
          console.log('NO PUEDES ACCEDER PORQUE NO ES TU MASCOTA');
          this.router.navigate(['main ']);
        }
      }
    );
    setTimeout(() => {
      
    },2000);
    
  }

  getEdad() {
    return (
      new Date().getFullYear() - new Date(this.mascota.nacimiento).getFullYear()
    );
  }

  getStringDate(fecha: number[]) {
    let date = new Date(fecha[0],fecha[1],fecha[3],fecha[4],fecha[5],fecha[6])
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`
  }
  
  readAndRedirectIncidencia(id: number) {
      this.incidenciaService.readIncidencia(id).subscribe()
      this.router.navigate(['incidencia',id])
    }
    

}
