import { Component, inject } from '@angular/core';
import { Doctor } from '../doctor';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DoctorService } from '../doctor.service';
import { NavbarComponent } from "../navbar/navbar.component";

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
  
  ngOnInit(): void {
    this.formgroup =  new FormGroup({
        nombre: new FormControl('',Validators.required),
        apellidos1: new FormControl('',Validators.required),
        apellidos2: new FormControl('',Validators.required),
        nacimiento: new FormControl('',Validators.required),
        residencia: new FormControl('',Validators.required),
        telefono: new FormControl('',Validators.required),
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
              alert("Wrong format")
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
    console.log(this.formgroup.value)
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
        console.log(doctor)
        this.doctorService.createDoctor(doctor).subscribe(x => alert("Se ha editado"))
  
    } else {
        alert("Revise los campos restantes por favor")
    }
  }
  
  getUrl(): string {
    console.log((document.querySelector("img"))?.src!)
    return (document.querySelector("img"))?.src!
  
  }

}

function getExtension(value: string) {
  return value.substring(value.lastIndexOf('.') + 1);
}