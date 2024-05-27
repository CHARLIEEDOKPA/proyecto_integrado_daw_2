import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { Duenyo } from '../duenyo';
import { Doctor } from '../doctor';
import { Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

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

        redirectoTo(path: string) {
        this.router.navigate([path])
        }
        

        ngOnInit(): void {
            this.doctorService.getAllDoctors().subscribe(x => this.doctores = x,() => this.router.navigate(['main']))
        }

        deleteDuenyo(id: number, event: MouseEvent) {
            this.doctorService.deleteDoctor(id).subscribe();
            let row = (<Element>event.target).parentElement?.parentElement;
            row?.remove();
          
        }
}
