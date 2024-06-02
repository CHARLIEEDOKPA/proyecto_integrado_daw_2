import { Component, OnInit, inject } from '@angular/core';
import { Cita } from '../cita';
import { CitaService } from '../cita.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { JwtService } from './../jwt.service';

@Component({
  selector: 'app-citas',
  standalone: true,
  templateUrl: './citas.component.html',
  styleUrl: './citas.component.css',
  imports: [NavbarComponent],
})
export class CitasComponent implements OnInit {
  private jwtService = inject(JwtService);
  private citaService = inject(CitaService);

  citas!: Cita[];

  rol!: string;

  ngOnInit(): void {
    let credendials = this.jwtService.returnObjectFromJSON();

    if (credendials) {
      this.rol = credendials.rol;
    }

    this.citaService.getCitas().subscribe((x) => this.citas = x);
  }

  getFullDate(param: number) {
    let date = new Date(param);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  private returnDateWithTimeByCita(cita: Cita) {
    let dateCita = new Date(cita.date);
    let numbers: number[] = arrayStringToNumbers(cita.time.split(':'));
    dateCita.setHours(numbers[0]);
    dateCita.setMinutes(numbers[1]);
    dateCita.setSeconds(numbers[2]);
    return dateCita;
  }

  status(cita: Cita) {
    let actualDate = new Date();
    let dateCita = this.returnDateWithTimeByCita(cita);

    if (isToday(dateCita)) {
      return 'today';
    } else if (actualDate.getTime() < dateCita.getTime()) {
      return 'uncoming';
    } else {
      return 'past';
    }
  }
}

function arrayStringToNumbers(strings: string[]): number[] {
  return strings.map((x) => Number(x));
}

function isToday(dateCita: Date) {
  let actualDate = new Date();
  return (
    actualDate.getDate() === dateCita.getDate() &&
    actualDate.getMonth() === dateCita.getMonth() &&
    actualDate.getFullYear() === dateCita.getFullYear() &&
    dateCita.getTime() < actualDate.getTime()
  );
}
