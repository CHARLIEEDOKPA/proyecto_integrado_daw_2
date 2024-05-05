import { Component, OnInit, inject } from '@angular/core';
import { DuenyoService } from '../duenyo.service';
import { Duenyo } from '../duenyo';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota';

@Component({
  selector: 'app-duenyo',
  standalone: true,
  imports: [],
  templateUrl: './duenyo.component.html',
  styleUrl: './duenyo.component.css'
})
export class DuenyoComponent implements OnInit {

  private duenyoService = inject(DuenyoService)
  private mascotaService = inject(MascotaService)
  mascotas!:Mascota[]
  duenyo!:Duenyo

  ngOnInit(): void {
   this.duenyoService.getDuenyoByToken().subscribe(x => this.duenyo = x);
   this.mascotaService.getMascotas().subscribe(x => this.mascotas = x)
  }

}
