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
import { RecomendacionDto } from '../recomendacion-dto';
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
  rol!: string;
  incidencias!: IncidenciaDto[];
  recomendaciones!: RecomendacionDto[];
  recomendacionDoctorList!: RecomendacionDoctor[];
  incidenciaDuenyoList!: IncidenciaDuenyo[];

  ngOnInit(): void {
    this.recomendacionDoctorList = [];
    let credentials = this.jwtService.returnObjectFromJSON();
    if (credentials != null) {
      this.rol = credentials.rol;
      if (this.rol == 'duenyo') {
        this.recomendacionService
          .getRecomendacionesByDuenyo()
          .subscribe((x) => {
            this.recomendaciones = x;
          });
      } else {
        this.incidenciaService.getIncidenciasByDoctor().subscribe((x) => {
          this.incidencias = x;
        });
      }
    } else {
      this.jwtService.removeTokenAndRedirectLogin();
    }
  }

  public returnDoctorObservable(id: number) {
    return this.doctorService.getDoctorByRecomendacion(id);
  }

  getDoctorFullName(doctor: Doctor) {
    return `${doctor.nombre} ${doctor.apellidos1} ${doctor.apellidos2}`;
  }

  readAndRedirectViewRecomendacion(id: number) {
    this.recomendacionService
      .readRecomendacion(id)
      .subscribe((x) => console.log('Se ha leido'));
    this.router.navigate(['recomendacion/view/', id]);
  }

  checkLeido(x: RecomendacionDto | IncidenciaDto) {
    return x.leido ? 'LEIDO' : 'NO LEIDO';
  }

  redirectToIncidencia(id: number) {
    this.router.navigate(['incidencia',id])
  }

  getDuenyoFullName(duenyo: Duenyo) {
    return `${duenyo.nombre} ${duenyo.apellidos1} ${duenyo.apellidos2}`;
  }
}
