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
import { ToastrService } from 'ngx-toastr';

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

   private toastr = inject(ToastrService)
  mascota!: Mascota;

  ngOnInit(): void {
    this.formGroup  = new FormGroup({
      observacion : new FormControl('',[Validators.minLength(20),Validators.required])
    })

    this.mascotaService.getMascota(this.ID).subscribe(
      (x) => {
        this.mascota = x;
      },
      () => {
          this.route.navigate(['main'])
      }
    );

  }

  sendIncidencia() {
    let valid = this.formGroup.valid
        if(valid) {
          this.toastr.success("funciona")
            let observacion:any | string = this.formGroup.get(['observacion'])?.value
            let incidenciaRequest:IncidenciaRequest = {
                id_mascota: this.ID,
                observaciones: observacion
            }
            this.incidenciaService.sendIncidencia(incidenciaRequest).subscribe(x => {
                this.toastr.success("Se ha enviado")
                this.route.navigate(['mascota', this.ID])
            })

        } else {
          this.toastr.error("Ese campo tiene que estar relleno, y mínimo 20 carácteres")
        }
  }
}
