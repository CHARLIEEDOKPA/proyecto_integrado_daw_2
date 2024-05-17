import { Recomendacion } from './../recomendacion';
import { Component, OnInit, inject } from '@angular/core';
import { JwtService } from '../jwt.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { Incidencia } from '../incidencia';
import { RecomendacionService } from '../recomendacion.service';
import { DoctorService } from '../doctor.service';
import { CommonModule } from '@angular/common';
import { Doctor } from '../doctor';
import { RecomendacionDoctor } from '../recomendacion-doctor';



@Component({
    selector: 'app-notificacion',
    standalone: true,
    templateUrl: './notificacion.component.html',
    styleUrl: './notificacion.component.css',
    imports: [NavbarComponent,CommonModule]
})
export class NotificacionComponent implements OnInit{




  private jwtService = inject(JwtService)
  private recomendacionService = inject(RecomendacionService)
  private doctorService = inject(DoctorService)
  rol!:string
  incidencias!:Incidencia[]
  recomendaciones!:Recomendacion[]
  recomendacionDoctorList!:RecomendacionDoctor[]

  ngOnInit(): void {
    this.recomendacionDoctorList = []
    let credentials = this.jwtService.returnObjectFromJSON()
    if(credentials != null) {
      this.rol = credentials.rol
      if(this.rol == "duenyo") {
        
        this.recomendacionService.getRecomendacionesByDuenyo().subscribe(x => {
          this.recomendaciones = x
          let id = 1
          this.recomendaciones.forEach(recomendacion => {
            this.doctorService.getDoctorByRecomendacion(recomendacion.id).subscribe(x => {
              let recomendacionDoctor:RecomendacionDoctor = {
                id: id++,
                doctor : x,
                recomendacion: recomendacion
              }
              this.recomendacionDoctorList.push(recomendacionDoctor)
              console.log(this.recomendacionDoctorList)
            })
          })
          
          console.log(JSON.stringify(x))
        })
      }
    } else {
      this.jwtService.removeTokenAndRedirectLogin()
    }

  }

  public returnDoctorObservable(id:number) {
    return this.doctorService.getDoctorByRecomendacion(id)
  }

  getDoctorFullName(doctor: Doctor) {
    return `${doctor.nombre} ${doctor.apellidos1} ${doctor.apellidos2}`
  }

  readAndRedirectViewRecomendacion(id: number) {
    this.recomendacionService.readRecomendacion(id).subscribe(x => console.log("Se ha leido"))
    }

    recomendacionLeido(recomendacion:Recomendacion) {
      return recomendacion.leido ? 'LEIDO' : 'NO LEIDO'
      }


}
