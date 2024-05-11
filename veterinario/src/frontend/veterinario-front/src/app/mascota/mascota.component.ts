import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota';
import { IncidenciaService } from '../incidencia.service';
import { Incidencia } from '../incidencia';

@Component({
  selector: 'app-mascota',
  standalone: true,
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css',
  imports: [NavbarComponent],
})
export class MascotaComponent implements OnInit {


  

  private route = inject(ActivatedRoute);

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
    this.mascotaService.getMascota(this.ID).subscribe(
      (x) => {
        console.log(x);
        (this.mascota = x), x;
        this.incidenciaService.getIncidenciasByMascota(this.mascota.id).subscribe(x => this.incidencias = x);
      },
      (x) => {
        if (x.status === 401) {
          console.log('NO PUEDES ACCEDER PORQUE NO ES TU MASCOTA');
          this.router.navigate(['main ']);
        }
      }
    );
  }

  getEdad() {
    return (
      new Date().getFullYear() - new Date(this.mascota.nacimiento).getFullYear()
    );
  }
}
