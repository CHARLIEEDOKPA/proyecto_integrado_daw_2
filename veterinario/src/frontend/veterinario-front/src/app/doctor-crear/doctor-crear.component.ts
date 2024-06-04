import { Component, inject } from '@angular/core';
import { Doctor } from '../doctor';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
    selector: 'app-doctor-crear',
    standalone: true,
    templateUrl: './doctor-crear.component.html',
    styleUrl: './doctor-crear.component.css',
    imports: [ReactiveFormsModule, NavbarComponent]
})
export class DoctorCrearComponent {
  doctor: any;
  formgroup!: FormGroup;
  private doctorService = inject(DoctorService)
  private toastr = inject(ToastrService)
  private router = inject(Router)
  private jwtService = inject(JwtService)

  ngOnInit(): void {
    
    let rol = this.jwtService.returnObjectFromJSON()?.rol
    if(rol !== "administrador") {
      this.router.navigate(['main'])
    }
    
    this.formgroup =  new FormGroup({
        nombre: new FormControl('',Validators.required),
        apellidos1: new FormControl('',Validators.required),
        apellidos2: new FormControl('',Validators.required),
        nacimiento: new FormControl('',Validators.required),
        residencia: new FormControl('',Validators.required),
        telefono: new FormControl('',[Validators.required, Validators.maxLength(9),Validators.minLength(9)]),
        email: new FormControl('',Validators.email),
    })
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
              this.toastr.error("El formato tiene que ser png, jpeg o jgp")
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
  
  create() {
    let valid = this.formgroup.valid
    if(valid) {
        let formValue = this.formgroup.value
        let doctor:Doctor = {
            id : 0,
            nombre: formValue.nombre,
            apellidos1: formValue.apellidos1,
            apellidos2: formValue.apellidos2,
            nacimiento: formValue.nacimiento,
            residencia: formValue.residencia,
            telefono: formValue.telefono,
            email: formValue.email
  
        }
        this.doctorService.createDoctor(doctor).subscribe(() =>{
          this.toastr.success("Se ha editado")
          this.router.navigate(['doctor-crud'])
        } , () => {
          this.toastr.error("Tuvo un error al crear el doctor, puede que el email ya esta registrado antes")
        })
  
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