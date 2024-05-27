import { RecomendacionService } from './../recomendacion.service';
import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Recomendacion } from '../recomendacion';
import { DoctorService } from '../doctor.service';
import { Doctor } from '../doctor';
import { RecomendacionDto } from '../recomendacion-dto';

@Component({
  selector: 'app-recomendacion-view',
  standalone: true,
  templateUrl: './recomendacion-view.component.html',
  styleUrl: './recomendacion-view.component.css',
  imports: [NavbarComponent],
})
export class RecomendacionViewComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private ID = Number(this.route.snapshot.paramMap.get('id'));

  private recomendacionService = inject(RecomendacionService);

  doctor!: Doctor;

  recomendacion!: RecomendacionDto;
  private doctorService = inject(DoctorService);

  ngOnInit(): void {
    this.recomendacionService.getRecomendacionById(this.ID).subscribe((x) => {
     this.recomendacion = x
    },() => this.router.navigate(['main']));
  }
}
