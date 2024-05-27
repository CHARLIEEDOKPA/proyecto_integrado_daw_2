import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidenciaService } from '../incidencia.service';
import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { IncidenciaRequest } from '../incidencia-request';

@Component({
  selector: 'app-incidencia-report',
  standalone: true,
  templateUrl: './incidencia-report.component.html',
  styleUrl: './incidencia-report.component.css',
  imports: [NavbarComponent, ReactiveFormsModule],
})
export class IncidenciaReportComponent implements OnInit {
  formGroup!: FormGroup;

  private router = inject(ActivatedRoute);

  private ID = Number(this.router.snapshot.paramMap.get('id'));

  private incidenciaService = inject(IncidenciaService);

  private mascotaService = inject(MascotaService);

  private route = inject(Router)
  mascota!: Mascota;

  ngOnInit(): void {
    this.mascotaService.getMascota(this.ID).subscribe(
      (x) => {
        this.mascota = x;
      },
      (error) => {
        let status = error.status;
        if (status == 401) {
          console.log('No puedes acceder a esta mascota');
          this.route.navigate(['main'])
        }

        if (status == 400) {
          console.log(`La mascota con el id ${this.ID} no ha sido encontrado`);
        }
      }
    );

    this.formGroup = new FormGroup({
      observacion: new FormControl('', Validators.minLength(20)),
    });
  }

  sendIncidencia() {
    let valid = this.formGroup.valid
        if(valid) {
            let observacion:any | string = this.formGroup.get(['observacion'])?.value
            let incidenciaRequest:IncidenciaRequest = {
                id_mascota: this.ID,
                observaciones: observacion
            }
            this.incidenciaService.sendIncidencia(incidenciaRequest).subscribe(x => {
                alert("Se ha enviado")
                this.route.navigate(['mascota', this.ID])
            })

        }
  }
}
