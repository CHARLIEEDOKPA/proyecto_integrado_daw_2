import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DuenyoService } from '../duenyo.service';
import { Duenyo } from '../duenyo';

@Component({
  selector: 'app-duenyos-browser',
  standalone: true,
  templateUrl: './duenyos-browser.component.html',
  styleUrl: './duenyos-browser.component.css',
  imports: [NavbarComponent],
})
export class DuenyosBrowserComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  PATTERN = this.route.snapshot.paramMap.get('pattern');
  private duenyoService = inject(DuenyoService);
  duenyos!: Duenyo[];

  ngOnInit(): void {
    this.duenyoService
      .getDuenyosByPattern(this.PATTERN)
      .subscribe((x) => (this.duenyos = x));
  }

  redirectPublicaciones(id: number) {
    this.router.navigate(['publicaciones',id])
  }

  fullName(duenyo: Duenyo) {
    return `${duenyo.nombre} ${duenyo.apellidos1} ${duenyo.apellidos2}`;
  }
}
