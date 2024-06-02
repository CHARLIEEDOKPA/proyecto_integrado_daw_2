import { Component, OnInit, inject } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-add-subadmin',
  standalone: true,
  templateUrl: './add-subadmin.component.html',
  styleUrl: './add-subadmin.component.css',
  imports: [NavbarComponent, ReactiveFormsModule],
})
export class AddSubadminComponent implements OnInit {
  formgroup!: FormGroup;
  private toastr = inject(ToastrService);
  private adminService = inject(AdminService)
  private router = inject(Router)
  private jwtService = inject(JwtService)

  ngOnInit(): void {
    let rol = this.jwtService.returnObjectFromJSON()?.rol
    if (rol !== "administrador") {
      this.router.navigate(['main'])
    }
    this.formgroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  create() {
    let valid = this.formgroup.valid;
    if (valid) {
        let value = this.formgroup.value
        this.adminService.addSubAdmin(value).subscribe(() => {
            this.toastr.success("Se ha registrado el subadministrador")
            this.router.navigate(['main'])
        },(error) => {
            this.toastr.error("Error al intentar registrar el subadministrador, puede que el email que ha puesto ya ha sido registrado antes")
        })

    } else {
        this.toastr.error("El campo tiene que estar relleno y con el formato correo de email")
    }
  }
}
