import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from '../mascota';
import { MascotaService } from '../mascota.service';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { JwtService } from '../jwt.service';

@Component({
    selector: 'app-mascota-editar',
    standalone: true,
    templateUrl: './mascota-editar.component.html',
    styleUrl: './mascota-editar.component.css',
    imports: [NavbarComponent,DatePipe,ReactiveFormsModule,FormsModule]
})
export class MascotaEditarComponent implements OnInit{



    formgroup!:FormGroup

    private route = inject(ActivatedRoute)
    private toastr = inject(ToastrService)
  private mascotaService = inject(MascotaService)
  private router = inject(Router)
  private ID =  Number(this.route.snapshot.paramMap.get("id"))
  private jwtService = inject(JwtService)
  mascota!:Mascota

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
    })
    this.mascotaService.getMascota(this.ID).subscribe(x => this.mascota = x,() => this.router.navigate(['mascota-crud']))
  }

   previewFile() {
    const preview = document.querySelector("img");
    const file = (<HTMLInputElement>document.querySelector("input[type=file]")).files![0];
    const ext = getExtension((<HTMLInputElement>document.querySelector('input[type=file]')!).value); 
    const reader = new FileReader();
  

    
    reader.addEventListener(
      "load",
      () => {
        // convert image file to base64 string
        if(preview) {
            if(typeof reader.result === "string" && (ext === "png" || ext == "jpg" || ext == "jpeg" )) {
                preview.src = reader.result!;
            } else {
              this.toastr.error("El formato tiene que ser png, jpg o jpeg")
            }
        }
        
      },
      false,
    );
  
    if (file) {
      if(file.type)
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    document.querySelector("img")!.src = "";
    }

  edit() {
    let valid = this.formgroup.valid
    if(valid) {
        let formValue = this.formgroup.value
        let mascota:Mascota = {
            id : this.ID,
            nombre: formValue.nombre,
            raza: formValue.raza,
            nacimiento: formValue.nacimiento,
            sexo: formValue.sex,
            citas: null,
            incidencias: null,
            foto: this.getUrl()

        }

        this.mascotaService.editMascota(mascota).subscribe(() => this.toastr.success("Se ha editado"))

    } else {
        this.toastr.error("Revise los campos restantes por favor")
    }
  }

  getUrl(): string {
    return (document.querySelector("img"))?.src!
}
}


function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}
