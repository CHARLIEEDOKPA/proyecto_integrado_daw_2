import { RecomendacionDto } from './../recomendacion-dto';
import { IncidenciaDto } from './../incidencia-dto';
import { Recomendacion } from './../recomendacion';
import { Component, OnInit, inject } from '@angular/core';
import { JwtService } from '../jwt.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { Incidencia } from '../incidencia';
import { RecomendacionService } from '../recomendacion.service';
import { DoctorService } from '../doctor.service';
import { CommonModule } from '@angular/common';
import { Doctor } from '../doctor';
import { RecomendacionDoctor } from '../recomendacion-doctor';
import { Router } from '@angular/router';
import { IncidenciaService } from '../incidencia.service';
import { IncidenciaDuenyo } from '../incidencia-duenyo';
import { DuenyoService } from '../duenyo.service';
import { Duenyo } from '../duenyo';

@Component({
  selector: 'app-notificacion',
  standalone: true,
  templateUrl: './notificacion.component.html',
  styleUrl: './notificacion.component.css',
  imports: [NavbarComponent, CommonModule],
})
export class NotificacionComponent implements OnInit {

  private jwtService = inject(JwtService);
  private recomendacionService = inject(RecomendacionService);
  private incidenciaService = inject(IncidenciaService);
  private doctorService = inject(DoctorService);
  private router = inject(Router);
  private duenyoService = inject(DuenyoService);
  private privateRecomendaciones !:RecomendacionDto[]
  private privateIncidencias !:IncidenciaDto[]
  rol!: string;
  incidencias!: IncidenciaDto[];
  recomendaciones!: RecomendacionDto[];
  recomendacionDoctorList!: RecomendacionDoctor[];
  incidenciaDuenyoList!: IncidenciaDuenyo[];

  ngOnInit(): void {
    let credentials = this.jwtService.returnObjectFromJSON();
    if (credentials != null) {
      this.rol = credentials.rol;
      if(this.rol === "administrador" || this.rol === "subadministrador") {
        this.router.navigate(['main'])
      }
      if (this.rol == 'duenyo') {
       
        this.recomendacionService
          .getRecomendacionesByDuenyo()
          .subscribe((x) => {
            this.privateRecomendaciones = x
            this.recomendaciones = this.privateRecomendaciones
          });
      } else {
        this.incidenciaService.getIncidenciasByDoctor().subscribe((x) => {
          this.privateIncidencias = x
          this.incidencias = this.privateIncidencias
        });
      }
    } else {
      this.jwtService.removeTokenAndRedirectLogin();
    }
  }

  public returnDoctorObservable(id: number) {
    return this.doctorService.getDoctorByRecomendacion(id);
  }

  filtrarPorNoLeidos() {
    if(this.rol === "duenyo"){
      this.recomendaciones = this.privateRecomendaciones.filter(x => !x.leido)
    } else {
      this.incidencias = this.privateIncidencias.filter(x => !x.leido)
    }
    }

    filtrarPorLeidos() {
      if(this.rol === "duenyo"){
        this.recomendaciones = this.privateRecomendaciones.filter(x => x.leido)
      } else {
        this.incidencias = this.privateIncidencias.filter(x => x.leido)
      }
      }

  getDoctorFullName(doctor: Doctor) {
    return `${doctor.nombre} ${doctor.apellidos1} ${doctor.apellidos2}`;
  }

  readAndRedirectViewRecomendacion(id: number) {
    this.recomendacionService
      .readRecomendacion(id).subscribe(x => this.router.navigate(['recomendacion/view/', id]))
    
  }

  checkLeido(x: RecomendacionDto | IncidenciaDto) {
    return x.leido ? 'LEIDO' : 'NO LEIDO';
  }

  redirectToIncidencia(id: number) {
    this.incidenciaService.readIncidencia(id).subscribe(x => this.router.navigate(['incidencia',id]))
    
  }

  getDuenyoFullName(duenyo: Duenyo) {
    return `${duenyo.nombre} ${duenyo.apellidos1} ${duenyo.apellidos2}`;
  }
}
