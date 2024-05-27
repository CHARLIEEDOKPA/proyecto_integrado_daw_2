import { DuenyoService } from './../duenyo.service';
import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Duenyo } from '../duenyo';

@Component({
    selector: 'app-duenyo-editar',
    standalone: true,
    templateUrl: './duenyo-editar.component.html',
    styleUrl: './duenyo-editar.component.css',
    imports: [NavbarComponent,DatePipe,ReactiveFormsModule]
})
export class DuenyoEditarComponent {

    


    formgroup!:FormGroup

    private route = inject(ActivatedRoute)

  private duenyoService = inject(DuenyoService)

  private ID =  Number(this.route.snapshot.paramMap.get("id"))
  private router = inject(Router)
  duenyo!:Duenyo

  ngOnInit(): void {
    this.formgroup =  new FormGroup({
        nombre: new FormControl('',Validators.required),
        apellidos1: new FormControl('',Validators.required),
        apellidos2: new FormControl('',Validators.required),
        nacimiento: new FormControl('',Validators.required),
        residencia: new FormControl('',Validators.required),
        telefono: new FormControl('',Validators.required),
    })
    this.duenyoService.getDuenyoById(this.ID).subscribe(x => this.duenyo = x,() => this.router.navigate(['duenyo-crud']))
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

  edit() {
    let valid = this.formgroup.valid
    console.log(this.formgroup.value)
    if(valid) {
        let formValue = this.formgroup.value
        let duenyo:Duenyo = {
            id : this.ID,
            nombre: formValue.nombre,
            apellidos1: formValue.apellidos1,
            apellidos2: formValue.apellidos2,
            nacimiento: formValue.nacimiento,
            residencia: formValue.residencia,
            telefono: formValue.telefono,
            foto: this.getUrl(),
            email: this.duenyo.email

        }

        this.duenyoService.editDuenyo(duenyo,this.ID).subscribe(x => alert("Se ha editado"))

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
  