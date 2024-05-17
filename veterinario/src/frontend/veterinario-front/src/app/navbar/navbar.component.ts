import { Incidencia } from './../incidencia';
import { JwtService } from './../jwt.service';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecomendacionService } from '../recomendacion.service';
import { IncidenciaService } from '../incidencia.service';
import { Recomendacion } from '../recomendacion';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit{
 
  @Input() rol!: string;

  private recomendacionService = inject(RecomendacionService)

  private incidenciaService = inject(IncidenciaService)

  private JwtService = inject(JwtService)

  lenght!:number

  private incidencias!:Incidencia[]
  
  private recomendaciones!:Recomendacion[]

  private router = inject(Router)
  private jwtService = inject(JwtService)

  public redirectToMain() {
    this.router.navigate(['main'])
  }

  private redirectToLogin() {
    this.router.navigate(['login'])
  }

  public redirectToNotifications() {
    this.router.navigate(['notificaciones'])
  }

  public logout() {
    this.jwtService.removeTokenAndRedirectLogin()

    
  }

  ngOnInit(): void {
    let credenciales = this.jwtService.returnObjectFromJSON()
    if(credenciales) {
      switch(this.rol) {
        case 'duenyo': 
          this.recomendacionService.getRecomendacionesByDuenyo().subscribe(x =>  {
            this.recomendaciones = x.filter(x => !x.leido)
            this.lenght = this.recomendaciones.length
          })
          break
        case 'doctor': 
          this.incidenciaService.getIncidenciasByDoctor().subscribe(x => this.incidencias = x)
          break
        
      }
    } else {
      this.redirectToLogin()
    }
  }

  getNumberNotificacionesNoLeidos() {
    let length:number = 0
    setTimeout(() => {
      if(this.rol == 'duenyo') {
        length = this.incidencias.length
      }
      length = this.recomendaciones.length
    }, 2000);

    return length
   
  }
}
