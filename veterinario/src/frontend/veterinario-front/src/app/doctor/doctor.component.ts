import { Component, OnInit, inject } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorService } from '../doctor.service';
import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';
import { Incidencia } from '../incidencia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [],
  templateUrl: './doctor.component.html',
  styleUrl: './doctor.component.css',
})
export class DoctorComponent implements OnInit {
gotoMascotaById(id: number) {
  this.router.navigate(['mascota',id])
}

  doctor!: Doctor;
  mascotas!:Mascota[];

  private doctorService = inject(DoctorService);
  private mascotaService = inject(MascotaService);
  private router = inject(Router)

  getWelcomeTextByHour() {
    let hours = new Date().getHours();
    switch (true) {
      case hours < 12:
        return 'BUENOS DIAS';
      case hours < 18:
        return 'BUENAS TARDES';
      default:
        return 'BUENAS NOCHES';
    }
  }

  ngOnInit(): void {
    this.doctorService.getDoctorByToken().subscribe((x) => (this.doctor = x));
    this.mascotaService.getMascotas().subscribe(x => this.mascotas = x)

  }

  getNumeroDeIncidenciasNoLeidas(incidencias: Incidencia[]) {
    let num = incidencias.filter(x => !x.leido).length
    return num > 0 ? `(${num})` : ``
  }

  redirectViewIncidencias(id: number) {
      
    }

}
