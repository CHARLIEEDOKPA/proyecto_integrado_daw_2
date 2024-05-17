import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { RecomendacionService } from '../recomendacion.service';
import { Mascota } from '../mascota';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecomendacionRequest } from '../recomendacion-request';

@Component({
    selector: 'app-recomendacion',
    standalone: true,
    templateUrl: './recomendacion.component.html',
    styleUrl: './recomendacion.component.css',
    imports: [NavbarComponent, ReactiveFormsModule]
})
export class RecomendacionComponent implements OnInit{



  private route = inject(ActivatedRoute)

  private router = inject(Router)

  private ID = Number(this.route.snapshot.paramMap.get("id"))

  private mascotaService = inject(MascotaService)

  private recomendacionService = inject(RecomendacionService)

  mascota!:Mascota
  
  formgroup!:FormGroup
  ngOnInit(): void {
    this.mascotaService.getMascota(this.ID).subscribe(x => this.mascota = x)
    this.formgroup = new FormGroup({
      sobre : new FormControl("",[Validators.required,Validators.minLength(10)]),
      texto: new FormControl("",[Validators.required,Validators.minLength(20)])
    })
    console.log(this.ID)
  }

  sendRecomendacion() {
      let valid = this.formgroup.valid

      if(valid) {
        let recomendacion = this.formgroup.value
        let recomendacionRequest:RecomendacionRequest = {
          sobre : recomendacion.sobre,
          texto : recomendacion.texto,
          id_mascota : this.ID
        }
        
        this.recomendacionService.sendRecomendacion(recomendacionRequest).subscribe(x => {
          alert(`Se ha enviado la incidencia a la mascota ${this.mascota.nombre}`)
          this.router.navigate(['mascota',this.ID])
        })

      }else {
        alert("Los campos deberían estar rellenos o tuvo un error")
      }
    }

}
