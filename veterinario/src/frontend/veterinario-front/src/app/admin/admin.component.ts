import { JwtService } from './../jwt.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent  implements OnInit{
  


  private router = inject(Router)
  private jwtService = inject(JwtService)
  rol!:string

  redirectoTo(path: string) {
    this.router.navigate([path])
    }

    ngOnInit(): void {
      let credenciales = this.jwtService.returnObjectFromJSON()
      this.rol = credenciales?.rol!
    }

}
