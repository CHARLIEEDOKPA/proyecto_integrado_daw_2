import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { Duenyo } from '../duenyo';
import { DuenyoService } from '../duenyo.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService)
  
  redirectoTo(path: string) {
    this.router.navigate([path]);
  }

  deleteDuenyo(id: number, event: MouseEvent) {
    this.duenyoService.deleteDuenyo(id).subscribe();
    let row = (<Element>event.target).parentElement?.parentElement;
    row?.remove();
  }

  resetContrasenya(duenyo: Duenyo) {
    this.duenyoService.resetPassword(duenyo.email).subscribe(x => {
      this.toastr.success(`Se ha reseteado la contraseña de ${duenyo.email}`)
    });
    }

  ngOnInit(): void {
    this.duenyoService.getAllDuenyos().subscribe((x) => (this.duenyos = x),() => this.router.navigate(['main']));
  }
}
