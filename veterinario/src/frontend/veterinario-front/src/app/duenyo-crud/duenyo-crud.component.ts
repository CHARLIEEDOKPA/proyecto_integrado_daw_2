import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-duenyo-crud',
  standalone: true,
  templateUrl: './duenyo-crud.component.html',
  styleUrl: './duenyo-crud.component.css',
  imports: [NavbarComponent],
})
export class DuenyoCrudComponent implements OnInit {
  duenyos!: Duenyo[];
  private duenyoService = inject(DuenyoService);
  private router = inject(Router);
  
  redirectoTo(path: string) {
    this.router.navigate([path]);
  }

  deleteDuenyo(id: number, event: MouseEvent) {
    this.duenyoService.deleteDuenyo(id).subscribe();
    let row = (<Element>event.target).parentElement?.parentElement;
    row?.remove();
  }

  ngOnInit(): void {
    this.duenyoService.getAllDuenyos().subscribe((x) => (this.duenyos = x),() => this.router.navigate(['main']));
  }
}
