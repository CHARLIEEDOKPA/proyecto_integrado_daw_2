import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { DatePipe } from '@angular/common';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-duenyo-detalle',
    standalone: true,
    templateUrl: './duenyo-detalle.component.html',
    styleUrl: './duenyo-detalle.component.css',
    imports: [NavbarComponent,DatePipe]
})
export class DuenyoDetalleComponent implements OnInit{

duenyo!: Duenyo;

private route = inject(ActivatedRoute)

private ID = Number(this.route.snapshot.paramMap.get("id"))

private duenyoService = inject(DuenyoService)

ngOnInit(): void {
    this.duenyoService.getDuenyoById(this.ID).subscribe(x => this.duenyo = x)
}
}
