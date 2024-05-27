import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe } from '@angular/common';
import { Doctor } from '../doctor';
import { ActivatedRoute } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
    selector: 'app-doctor-detalle',
    standalone: true,
    templateUrl: './doctor-detalle.component.html',
    styleUrl: './doctor-detalle.component.css',
    imports: [NavbarComponent,DatePipe]
})
export class DoctorDetalleComponent implements OnInit{

    doctor!: Doctor;

    private route = inject(ActivatedRoute)
    
    private ID = Number(this.route.snapshot.paramMap.get("id"))
    
    private doctorService = inject(DoctorService)
    
    ngOnInit(): void {
        this.doctorService.getDoctorById(this.ID).subscribe(x => this.doctor = x)
    }
}
