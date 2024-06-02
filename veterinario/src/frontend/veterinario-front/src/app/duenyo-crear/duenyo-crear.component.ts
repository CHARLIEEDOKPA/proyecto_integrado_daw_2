import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Mascota } from '../mascota';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-duenyo-crear',
  standalone: true,
  templateUrl: './duenyo-crear.component.html',
  styleUrl: './duenyo-crear.component.css',
  imports: [NavbarComponent, ReactiveFormsModule],
})
export class DuenyoCrearComponent implements OnInit {
  formgroup!: FormGroup;
  private toastr = inject(ToastrService)
  private duenyoService = inject(DuenyoService);
  private router = inject(Router)
  private jwtService = inject(JwtService)

  previewFile() {
    const preview = document.querySelector('img');
    const file = (<HTMLInputElement>document.querySelector('input[type=file]'))
      .files![0];
    const ext = getExtension(
      (<HTMLInputElement>document.querySelector('input[type=file]')!).value
    );
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        // convert image file to base64 string
        if (preview) {
          if (
            typeof reader.result === 'string' &&
            (ext === 'png' || ext == 'jpg' || ext == 'jpeg')
          ) {
            preview.src = reader.result!;
          } else {
            this.toastr.error('El formato tiene que ser png, jpg o jpeg');
          }
        }
      },
      false
    );

    if (file) {
      if (file.type) reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    let rol = this.jwtService.returnObjectFromJSON()?.rol
    if(rol !== "administrador") {
      this.router.navigate(['main'])
    }
    this.formgroup = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellidos1: new FormControl('', Validators.required),
      apellidos2: new FormControl('', Validators.required),
      nacimiento: new FormControl('', Validators.required),
      residencia: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
    });
  }

  create() {
    let valid = this.formgroup.valid;
    if (valid) {
      let formValue = this.formgroup.value;
      let duenyo: Duenyo = {
        id: 0,
        nombre: formValue.nombre,
        apellidos1: formValue.apellidos1,
        apellidos2: formValue.apellidos2,
        nacimiento: formValue.nacimiento,
        residencia: formValue.residencia,
        telefono: formValue.telefono,
        foto: this.getUrl(),
        email: formValue.email,
      };

      this.duenyoService
        .crearDuenyo(duenyo)
        .subscribe(() => {
          this.toastr.success('Se ha creado')
          this.router.navigate(['duenyo-crud'])
        } ,() => {
          this.toastr.error("Tuvo un error al crear el dueño, puede que el email ya esta registrado antes")
        });
    } else {
      this.toastr.error('Revise los campos restantes por favor');
    }
  }

  getUrl(): string {
    return document.querySelector('img')?.src!;
  }
}

function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}
