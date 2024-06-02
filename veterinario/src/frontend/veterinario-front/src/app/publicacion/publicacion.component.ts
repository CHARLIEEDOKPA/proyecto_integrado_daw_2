import { ComentarioDto } from './../comentario-dto';
import { Comentario } from './../comentario';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { PublicacionDto } from '../publicacion-dto';
import { PublicacionService } from '../publicacion.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Duenyo } from '../duenyo';
import { JwtService } from '../jwt.service';
import { MeGusta } from '../me-gusta';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-publicacion',
    standalone: true,
    templateUrl: './publicacion.component.html',
    styleUrl: './publicacion.component.css',
    imports: [NavbarComponent, ReactiveFormsModule]
})
export class PublicacionComponent implements OnInit {
  publicacion!: PublicacionDto;
  private publicacionService = inject(PublicacionService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ID = Number(this.route.snapshot.paramMap.get('id'));
  private jwtService = inject(JwtService);
  private toastr = inject(ToastrService)
  formgroup!: FormGroup;

  getFullName(duenyo: Duenyo) {
    return `${duenyo.nombre} ${duenyo.apellidos1} ${duenyo.apellidos2}`;
  }

  redirectToPublicaciones(id: number) {
    this.router.navigate(['publicaciones', id]);
  }

  like() {
    this.publicacionService.like(this.ID).subscribe(() => {
        let id = this.jwtService.returnObjectFromJSON()?.id;
        let meGusta:MeGusta = {
            id: 0,
            id_duenyo: id!,
            id_publicacion: this.ID 
        }
        this.publicacion.megustas.push(meGusta)
      });
  }

  enviarComentario() {
    let valid = this.formgroup.valid;
    if (valid) {
      let texto: string = this.formgroup.value.texto;
      let comentario: Comentario = {
        texto: texto,
        id: 0,
        id_publicacion: this.publicacion.id,
      };

      this.publicacionService.enviarComentario(comentario).subscribe((x) => {
        this.publicacion.comentarioDTOs.unshift(x);
        this.formgroup.reset();
      });
    } else {
      this.toastr.error('Al menos un carácter');
    }
  }

  dislike() {
    this.publicacionService.dislike(this.ID).subscribe(() => {
      let id = this.jwtService.returnObjectFromJSON()?.id;
      this.publicacion.megustas = this.publicacion.megustas.filter(x => id != x.id_duenyo)
    });
  }

  containsMeGusta() {
    let meGustas = this.publicacion.megustas;
    return meGustas.find((x) => {
      let credenciales = this.jwtService.returnObjectFromJSON();
      return credenciales?.id === x.id_duenyo;
    });
  }

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      texto: new FormControl('', Validators.required),
    });
    this.publicacionService.getPublicacionById(this.ID).subscribe((x) => {
      this.publicacion = x;
    },() => this.router.navigate(['main']));
  }
}
