import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MascotaService } from '../mascota.service';
import { RecomendacionService } from '../recomendacion.service';
import { Mascota } from '../mascota';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RecomendacionRequest } from '../recomendacion-request';
import { AddCitaComponent } from '../add-cita/add-cita.component';
import { CitaRequest } from '../cita-request';
import { CitaService } from '../cita.service';

@Component({
  selector: 'app-recomendacion',
  standalone: true,
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.css',
  imports: [NavbarComponent, ReactiveFormsModule, AddCitaComponent],
})
export class RecomendacionComponent implements OnInit {
  showCita = false;

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private ID = Number(this.route.snapshot.paramMap.get('id'));

  private mascotaService = inject(MascotaService);

  private citaService = inject(CitaService);

  @ViewChild(AddCitaComponent) private addCitaComponent!: AddCitaComponent;

  private recomendacionService = inject(RecomendacionService);

  mascota!: Mascota;

  formgroup!: FormGroup;
  ngOnInit(): void {
    this.mascotaService
      .getMascota(this.ID)
      .subscribe((x) => (this.mascota = x));
    this.formgroup = new FormGroup({
      sobre: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      texto: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
      ]),
    });
  }

  sendRecomendacion() {
    let valid = this.formgroup.valid;
    if (valid) {
      alert("entra")
      let recomendacion = this.formgroup.value;
      let correctToSend = true;
      let recomendacionRequest: RecomendacionRequest = {
        sobre: recomendacion.sobre,
        texto: recomendacion.texto,
        id_mascota: this.ID,
      };
      let date: string;
      let time: Date;
      if (this.showCita) {
        this.addCitaComponent.getDate()
        time = this.addCitaComponent.time;
        date = this.addCitaComponent.date;

        correctToSend =
          this.addCitaComponent.time != null &&
          this.checkDateAndTime(time, date);
      }

      if (this.showCita && correctToSend) {
        this.recomendacionService
          .sendRecomendacion(recomendacionRequest)
          .subscribe((x) => {
            alert(
              `Se ha enviado la incidencia a la mascota ${this.mascota.nombre} y se añadido una cita`
            );
            let timeString = `${time.getHours().toString().padStart(2,'0')}:${time.getMinutes().toString().padStart(2,'0')}:00`;

            let citaRequest: CitaRequest = {
              date: date.split("/").reverse().join("-"),
              time: `${timeString}`,
              id_mascota: this.ID,
            };
            console.log(citaRequest)
            this.citaService.sendCita(citaRequest).subscribe((x) => {
              console.log('Se ha creado la cita');
              this.router.navigate(['mascota', this.ID]);
            });
          });
      } else {
        this.recomendacionService
          .sendRecomendacion(recomendacionRequest)
          .subscribe((x) => {
            alert(
              `Se ha enviado la incidencia a la mascota ${this.mascota.nombre} y se añadido una cita`
            );
            this.router.navigate(['mascota', this.ID]);
          });
      }
    } else {
      alert('Los campos deberían estar rellenos o tuvo un error');
    }
  }

  showDateInputs() {
    this.showCita = true;
  }

  hideDateInputs() {
    this.showCita = false;
  }

  private checkDateAndTime(time: Date, date: string) {
    let arrayDate = date.split('/');
    let dateObject = new Date(
      this.toNumber(arrayDate[2]),
      this.toNumber(arrayDate[1]) - 1,
      this.toNumber(arrayDate[0])
    );

    if (dateObject.getDay() === 6 || dateObject.getDay() === 0) {
      return false;
    }

    let hours = time.getHours();

    if (hours > 15 || hours < 8) {
      return false;
    }

    return true;
  }

  private toNumber(param: string) {
    return Number(param);
  }
}
