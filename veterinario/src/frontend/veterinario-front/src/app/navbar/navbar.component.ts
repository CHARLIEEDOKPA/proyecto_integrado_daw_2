import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Credentials } from '../credentials';
import { IncidenciaService } from '../incidencia.service';
import { Recomendacion } from '../recomendacion';
import { RecomendacionService } from '../recomendacion.service';
import { Incidencia } from './../incidencia';
import { JwtService } from './../jwt.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @Input() rol!: string;

  private recomendacionService = inject(RecomendacionService);

  find(event?: SubmitEvent) {
    if (event) {
      event.preventDefault();
    }
    let value = (<HTMLInputElement>document.querySelector('form input')).value;
    if (value.length != 0) {
      location.replace(`result/${value}`);
    }
  }

  private incidenciaService = inject(IncidenciaService);

  private JwtService = inject(JwtService);

  lenght!: number;

  private incidencias!: Incidencia[];

  private recomendaciones!: Recomendacion[];

  private router = inject(Router);
  private jwtService = inject(JwtService);

  public redirectToMain() {
    this.router.navigate(['main']);
  }

  redirectToPublicaciones() {
    let id = this.jwtService.returnObjectFromJSON()?.id;
    this.router.navigate([`publicaciones/${id}`]);
  }

  private redirectToLogin() {
    this.router.navigate(['login']);
  }

  public redirectToNotifications() {
    this.router.navigate(['notificaciones']);
  }

  public logout() {
    this.jwtService.removeTokenAndRedirectLogin();
  }

  ngOnInit(): void {
    let credenciales = this.jwtService.returnObjectFromJSON();
    if (credenciales && !isExpired(credenciales)) {
      if (
        (credenciales.rol === 'duenyo' || credenciales.rol === 'doctor' || credenciales.rol === 'subadministrador') &&
        !credenciales.changedPassword
      ) {
        this.router.navigate(['change-password']);
      }
      switch (this.rol) {
        case 'duenyo':
          this.recomendacionService
            .getRecomendacionesByDuenyo()
            .subscribe((x) => {
              this.recomendaciones = x.filter((x) => !x.leido);
              this.lenght = this.recomendaciones.length;
            });
          break;
        case 'doctor':
          this.incidenciaService.getIncidenciasByDoctor().subscribe((x) => {
            this.incidencias = x.filter((x) => !x.leido);
            this.lenght = this.incidencias.length;
          });
          break;
      }
    } else {
      this.jwtService.removeTokenAndRedirectLogin();
    }
  }

  getNumberNotificacionesNoLeidos() {
    let length: number = 0;
    setTimeout(() => {
      if (this.rol == 'duenyo') {
        length = this.incidencias.length;
      }
      length = this.recomendaciones.length;
    }, 2000);

    return length;
  }

  redirectToCitas() {
    this.router.navigate(['citas']);
  }
}
function isExpired(credenciales: Credentials) {
  return new Date().getTime() > credenciales.exp * 1000;
}
