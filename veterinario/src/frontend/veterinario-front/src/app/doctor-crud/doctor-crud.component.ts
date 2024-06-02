import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Duenyo } from '../duenyo';
import { Doctor } from '../doctor';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-doctor-crud',
    standalone: true,
    templateUrl: './doctor-crud.component.html',
    styleUrl: './doctor-crud.component.css',
    imports: [NavbarComponent]
})
export class DoctorCrudComponent {


    doctores!: Doctor[];
    private doctorService = inject(DoctorService)
    private router = inject(Router)
    private toastr = inject(ToastrService)

        redirectoTo(path: string) {
        this.router.navigate([path])
        }
        

        ngOnInit(): void {
            this.doctorService.getAllDoctors().subscribe(x => this.doctores = x,() => this.router.navigate(['main']))
        }

        resetContrasenya(doctor: Doctor) {
            this.doctorService.resetPassword(doctor.email).subscribe(() => {
              this.toastr.success(`Se ha reseteado la contraseña de ${doctor.email}`)
            });
            }

        deleteDuenyo(id: number, event: MouseEvent) {
            if(this.doctores.length > 1) {
                this.doctorService.deleteDoctor(id).subscribe(() => {
                    let row = (<Element>event.target).parentElement?.parentElement;
                row?.remove();
                this.toastr.success("Se ha eliminado el doctor")
                },() => this.toastr.error("No se puede eliminar ese doctor ya que es el único doctor que queda"));
            } else {
                this.toastr.error("No se puede eliminar ese doctor ya que es el único doctor que queda")
            }
            
            
          
        }
}
