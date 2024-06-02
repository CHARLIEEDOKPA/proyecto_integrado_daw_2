import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';
import { MascotaRequest } from '../mascota-request';
import { MascotaService } from '../mascota.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mascota-crear',
    standalone: true,
    templateUrl: './mascota-crear.component.html',
    styleUrl: './mascota-crear.component.css',
    imports: [NavbarComponent,ReactiveFormsModule]
})
export class MascotaCrearComponent {


formgroup!:FormGroup

private duenyoService = inject(DuenyoService);
duenyos!:Duenyo[]
 private mascotaService =  inject(MascotaService);
 private router = inject(Router)
 private toastr = inject(ToastrService)
 private jwtService = inject(JwtService)


  ngOnInit(): void {
    let rol = this.jwtService.returnObjectFromJSON()?.rol
    if(rol !== "administrador") {
      this.router.navigate(['main'])
    }
      
    this.formgroup =  new FormGroup({
        nombre: new FormControl('',Validators.required),
        sex: new FormControl('',Validators.required),
        raza: new FormControl('',Validators.required),
        nacimiento: new FormControl('',Validators.required),
        duenyo: new FormControl('', Validators.required),
    })
    this.duenyoService.getAllDuenyos().subscribe(x => this.duenyos = x)
  }


add() {
  let valid = this.formgroup.valid
  if(valid) {
      let formValue = this.formgroup.value
      let mascota:MascotaRequest = {
          id_duenyo: Number(formValue.duenyo),
          id:0,
          nombre: formValue.nombre,
          raza: formValue.raza,
          nacimiento: formValue.nacimiento,
          sexo: formValue.sex,
          citas: null,
          incidencias: null,
          foto: this.getUrl()

      }

      this.mascotaService.addMascota(mascota).subscribe(x => {
        this.toastr.success("Se ha creado")
      })


  } else {
      this.toastr.error("Revise los campos restantes por favor")
  }
}


previewFile() {
  const preview = document.querySelector("img");
  const file = (<HTMLInputElement>document.querySelector("input[type=file]")).files![0];
  const ext = getExtension((<HTMLInputElement>document.querySelector("input[type=file]")).value)
  const reader = new FileReader();


  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      if(preview) {
          if(typeof reader.result === "string" && (ext === "png" || ext == "jpg" || ext == "jpeg" )) {
              preview.src = reader.result!;
          } else {
            (<HTMLInputElement>document.querySelector("input[type=file]")).value = ""
            this.toastr.error("El formato tiene que ser png, jpg o jpeg")
            
          }
      }
      
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}

getUrl(): string {
  return (document.querySelector("img"))?.src!
}

getFullName(duenyo: Duenyo) {
  return `${duenyo.nombre} ${duenyo.apellidos1} ${duenyo.apellidos2}`
  }

}



function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}