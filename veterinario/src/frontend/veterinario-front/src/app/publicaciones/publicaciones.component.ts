import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { PublicacionDto } from '../publicacion-dto';
import { PublicacionService } from '../publicacion.service';

@Component({
  selector: 'app-publicaciones',
  standalone: true,
  templateUrl: './publicaciones.component.html',
  styleUrl: './publicaciones.component.css',
  imports: [NavbarComponent],
})
export class PublicacionesComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ID = Number(this.route.snapshot.paramMap.get('id'));
  private publicacionService = inject(PublicacionService);
  private jwtService = inject(JwtService);
  publicaciones!: PublicacionDto[];

  ngOnInit(): void {
    this.publicacionService.getPublicionesByIdDuenyo(this.ID).subscribe(
      (x) => (this.publicaciones = x),
      () => this.router.navigate(['main'])
    );
  }

  redirectAddPublicacion() {
    this.router.navigate(['add-publicacion'])
    }

  redirectPublicacion(id: number) {
    this.router.navigate(['publicacion', id]);
  }

  autor() {
    let credenciales = this.jwtService.returnObjectFromJSON();
    return credenciales && this.ID === credenciales.id;
  }
}
