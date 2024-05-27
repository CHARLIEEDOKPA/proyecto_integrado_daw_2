import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { MascotaService } from '../mascota.service';
import { Mascota } from '../mascota';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota-crud',
  standalone: true,
  templateUrl: './mascota-crud.component.html',
  styleUrl: './mascota-crud.component.css',
  imports: [NavbarComponent],
})
export class MascotaCrudComponent implements OnInit {
  private mascotaService = inject(MascotaService);
  mascotas!: Mascota[];
  router = inject(Router);

  ngOnInit(): void {
    this.mascotaService.getMascotas().subscribe((x) => (this.mascotas = x));
  }

  redirectoTo(path: string) {
    this.router.navigate([path]);
  }

  deleteMascota(id: number, event:MouseEvent) {
    this.mascotaService.deleteMascota(id).subscribe()
    let row = (<Element>event.target).parentElement?.parentElement
    row?.remove()
  }
}
