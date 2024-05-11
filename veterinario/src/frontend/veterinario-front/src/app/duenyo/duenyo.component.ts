import { Component, OnInit, inject } from '@angular/core';
import { DuenyoService } from '../duenyo.service';
import { Duenyo } from '../duenyo';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota';
import { WeatherComponent } from '../weather/weather.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-duenyo',
  standalone: true,
  templateUrl: './duenyo.component.html',
  styleUrl: './duenyo.component.css',
  imports: [WeatherComponent],
})
export class DuenyoComponent implements OnInit {
  private duenyoService = inject(DuenyoService);
  private mascotaService = inject(MascotaService);
  private router = inject(Router);
  mascotas!: Mascota[];
  duenyo!: Duenyo;
  hour!: number;

  ngOnInit(): void {
    this.duenyoService.getDuenyoByToken().subscribe((x) => (this.duenyo = x));
    this.mascotaService.getMascotas().subscribe((x) => (this.mascotas = x));
  }

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

  gotoMascotaById(id:number) {
    this.router.navigate(['mascota',id])
  }
}
