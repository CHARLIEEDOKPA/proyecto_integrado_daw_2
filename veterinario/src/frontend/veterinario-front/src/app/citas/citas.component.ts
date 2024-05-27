import { JwtService } from './../jwt.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { CitaService } from '../cita.service';
import { Cita } from '../cita';

@Component({
    selector: 'app-citas',
    standalone: true,
    templateUrl: './citas.component.html',
    styleUrl: './citas.component.css',
    imports: [NavbarComponent]
})
export class CitasComponent implements OnInit{

  

  private jwtService = inject(JwtService)
  private citaService = inject(CitaService)

  citas!:Cita[]

   rol!:string

  ngOnInit(): void {
    let credendials = this.jwtService.returnObjectFromJSON()

    if(credendials) {
      this.rol = credendials.rol
    }

    this.citaService.getCitasByDuenyo().subscribe(x => this.citas = x)

  }

  getFullDate(param:number) {
    let date =  new Date(param);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
  }
  
  status(cita: Cita) {
     let actualDate =  new Date();
     let dateCita = new Date(cita.date);

     let actualDateString = this.getStringDate(actualDate);
     let dateCitaString = this.getStringDate(dateCita);

     if(actualDateString === dateCitaString) {
      return "today"
     } else if(dateCita.getTime() < actualDate.getTime()) {
      return "uncoming"
     } else {
      return "past"
     }
    }

    private getStringDate(date:Date) {
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

}



