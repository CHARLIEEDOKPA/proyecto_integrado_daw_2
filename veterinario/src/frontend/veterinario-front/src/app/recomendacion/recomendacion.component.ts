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
import { ToastrService } from 'ngx-toastr';
import { JwtService } from '../jwt.service';

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

  private toastr = inject(ToastrService);

  private router = inject(Router);

  private ID = Number(this.route.snapshot.paramMap.get('id'));

  private mascotaService = inject(MascotaService);

  private citaService = inject(CitaService);

  private jwtService = inject(JwtService);

  @ViewChild(AddCitaComponent) private addCitaComponent!: AddCitaComponent;

  private recomendacionService = inject(RecomendacionService);

  mascota!: Mascota;

  formgroup!: FormGroup;
  ngOnInit(): void {
    let rol = this.jwtService.returnObjectFromJSON()?.rol;
    if (rol !== 'doctor') {
      this.router.navigate(['main']);
    }
    this.mascotaService.getMascota(this.ID).subscribe(
      (x) => (this.mascota = x),
      () => this.router.navigate(['main'])
    );
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
    let date: string;
    let time: Date;
    if (valid) {
      let recomendacion = this.formgroup.value;
      let recomendacionRequest: RecomendacionRequest = {
        sobre: recomendacion.sobre,
        texto: recomendacion.texto,
        id_mascota: this.ID,
      };
      if (this.showCita) {
        this.addCitaComponent.getDate();
        time = this.addCitaComponent.time;
        date = this.addCitaComponent.date;
        let correctToSend = this.addCitaComponent.time != null && this.checkDateAndTime(time, date);
        if (correctToSend) {
          let citaRequest = this.buildCitaRequest(time,date);
          this.citaService.sendCita(citaRequest).subscribe(x => {
            this.recomendacionService.sendRecomendacion(recomendacionRequest).subscribe(() => {
              this.toastr.success(`Se ha enviado la recomendación para la mascota ${this.mascota.nombre} y  se ha asignado una cita`)
              this.router.navigate(['mascota',this.mascota.id])
            })
          }, () => {
            this.toastr.error("Puede que la cita querías asignar ya estaba asignada antes, por favor cambia de hora o de dia")
          })
        }

      } else {
        this.recomendacionService.sendRecomendacion(recomendacionRequest).subscribe(() => {
          this.toastr.success(`Se ha enviado la recomendación para la mascota ${this.mascota.nombre}`)
          this.router.navigate(['mascota',this.mascota.id])
        })
      }
    } else {
      this.toastr.error("Compruebe los campos por favor")
    }

  }

  private buildCitaRequest(time: Date, date: string) {
    let timeString = `${time
      .getHours()
      .toString()
      .padStart(2, '0')}:${time
        .getMinutes()
        .toString()
        .padStart(2, '0')}:00`;
    let citaRequest: CitaRequest = {
      date: date.split('/').reverse().join('-'),
      time: `${timeString}`,
      id_mascota: this.ID,
    };
    return citaRequest;
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
      this.toastr.error('Los findes de semana no cuentan');
      return false;
    }

    if (dateObject.getTime() < new Date().getTime()) {
      this.toastr.error('Ya ha pasado ese día, escoge uno correcto');
      return false;
    }

    let hours = time.getHours();

    if (hours > 15 || hours < 8) {
      this.toastr.error(
        'Tiene que ser minimo a las 8 AM y hasta las 4pm como máximo'
      );
      return false;
    }

    return true;
  }

  private toNumber(param: string) {
    return Number(param);
  }
}
