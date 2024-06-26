import { JwtService } from './../jwt.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PublicacionService } from '../publicacion.service';
import { Router } from '@angular/router';
import { Publicacion } from '../publicacion';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-publicacion',
  standalone: true,
  templateUrl: './add-publicacion.component.html',
  styleUrl: './add-publicacion.component.css',
  imports: [NavbarComponent, ReactiveFormsModule],
})
export class AddPublicacionComponent implements OnInit {

  private toastr = inject(ToastrService)
  showed: boolean = false;
  url!: string;
  imageClass: string = 'zero';
  formgroup!: FormGroup;
  private publicacionService = inject(PublicacionService);
  private router = inject(Router);
  private jwtService = inject(JwtService);

  ngOnInit(): void {
    this.formgroup = new FormGroup({
      descripcion: new FormControl('', Validators.required),
    });
  }

  getImage() {
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.click();
    inputFile.addEventListener('change', () => {
      this.previewFile(inputFile!.files![0]);
    });
  }

  subirPublicacion(event: MouseEvent) {
    event.preventDefault();
    if (this.url && this.url.length != 0) {
      let valid = this.formgroup.valid;
      if (valid) {
        let value = this.formgroup.value;
        let publicacion: Publicacion = {
          comentarios: [],
          megustas: [],
          descripcion: value.descripcion,
          photo_url: this.url,
          id: 0,
        };
        this.publicacionService.addPublicacion(publicacion).subscribe((x) => {
          let id = this.jwtService.returnObjectFromJSON()?.id;
          this.toastr.success("Se ha subido")
          this.router.navigate([`publicaciones/${id}`])
        });
      } else {
        this.toastr.error('Te faltan campos por rellenar');
      }
    } else {
      this.toastr.error('Necesitas subir una imagen');
    }
  }

  eliminarFoto() {
    this.url = '';
    this.imageClass = 'zero';
    this.showed = false;
  }

  private previewFile(file: File) {
    const preview = document.querySelector('img');
    const ext = getExtension(file.name);
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
            this.url = reader.result!;
            this.showed = true;
            this.imageClass = 'max';
          } else {
            this.toastr.error('Los formato debería ser png, jpeg o jpg');
          }
        }
      },
      false
    );

    if (file) {
      if (file.type) reader.readAsDataURL(file);
    }
  }
}
function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}
