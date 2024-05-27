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

@Component({
  selector: 'app-duenyo-crear',
  standalone: true,
  templateUrl: './duenyo-crear.component.html',
  styleUrl: './duenyo-crear.component.css',
  imports: [NavbarComponent, ReactiveFormsModule],
})
export class DuenyoCrearComponent implements OnInit {
  formgroup!: FormGroup;

  private duenyoService = inject(DuenyoService);

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
            alert('Wrong format');
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
    console.log(this.formgroup.value);
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
        .subscribe((x) => alert('Se ha creado'));
    } else {
      alert('Revise los campos restantes por favor');
    }
  }

  getUrl(): string {
    console.log(document.querySelector('img')?.src!);
    return document.querySelector('img')?.src!;
  }
}

function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}
