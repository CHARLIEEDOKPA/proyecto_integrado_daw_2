import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe } from '@angular/common';
import { DoctorService } from '../doctor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Doctor } from '../doctor';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-doctor-editar',
    standalone: true,
    templateUrl: './doctor-editar.component.html',
    styleUrl: './doctor-editar.component.css',
    imports: [ReactiveFormsModule, NavbarComponent,DatePipe]
})
export class DoctorEditarComponent implements OnInit{
doctor: any;
formgroup!: FormGroup;
private doctorService = inject(DoctorService)
private toastr = inject(ToastrService)

private route = inject(ActivatedRoute)
private ID =  Number(this.route.snapshot.paramMap.get("id"))
  private router = inject(Router);

ngOnInit(): void {
  this.formgroup =  new FormGroup({
      nombre: new FormControl('',Validators.required),
      apellidos1: new FormControl('',Validators.required),
      apellidos2: new FormControl('',Validators.required),
      nacimiento: new FormControl('',Validators.required),
      residencia: new FormControl('',Validators.required),
      telefono: new FormControl('',[Validators.required, Validators.maxLength(9),Validators.minLength(9)]),
  })
  this.doctorService.getDoctorById(this.ID).subscribe(x => this.doctor = x,() => this.router.navigate(['doctor-crud']))
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
            this.toastr.error("Wrong format")
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
      let doctor:Doctor = {
          id : this.ID,
          nombre: formValue.nombre,
          apellidos1: formValue.apellidos1,
          apellidos2: formValue.apellidos2,
          nacimiento: formValue.nacimiento,
          residencia: formValue.residencia,
          telefono: formValue.telefono,
          email: this.doctor.email

      }
      this.doctorService.editDoctor(doctor,this.ID).subscribe(() => {
        this.toastr.success("Se ha editado")
          this.router.navigate(['doctor-crud'])
      },() => {
        this.toastr.error("Error al editar el doctor")
      } )

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