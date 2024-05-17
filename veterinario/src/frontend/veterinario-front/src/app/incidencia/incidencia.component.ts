import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Mascota } from '../mascota';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { IncidenciaService } from '../incidencia.service';
import { DuenyoService } from '../duenyo.service';
import { Incidencia } from '../incidencia';
import { Duenyo } from '../duenyo';

@Component({
    selector: 'app-incidencia',
    standalone: true,
    templateUrl: './incidencia.component.html',
    styleUrl: './incidencia.component.css',
    imports: [NavbarComponent]
})
export class IncidenciaComponent implements OnInit{


     mascota!:Mascota

     private route = inject(ActivatedRoute);

     private router = inject(Router)

     private ID = Number(this.route.snapshot.paramMap.get("id"))

     private mascotaService = inject(MascotaService)

     private incidenciaService = inject(IncidenciaService)

     private duenyoService = inject(DuenyoService)

     incidencia!:Incidencia

     duenyo!:Duenyo
     


     ngOnInit(): void {
        this.incidenciaService.getIncidenciaById(this.ID).subscribe(x => {
            this.incidencia = x
            this.mascotaService.getMascota(x.id_mascota).subscribe(x => {
                this.mascota = x
                this.duenyoService.getDuenyoByIdMascota(this.mascota.id).subscribe(x => this.duenyo = x)
            })
            
        } )
        
    }

    responder(id: number) {
        this.router.navigate(['recomendacion',id])
        }
        




}
