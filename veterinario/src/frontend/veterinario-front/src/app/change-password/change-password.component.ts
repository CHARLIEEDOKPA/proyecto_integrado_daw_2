import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginServiceService } from '../login-service.service';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit{



  loginService = inject(LoginServiceService)
  jwtService = inject(JwtService)
  formGroup!:FormGroup
  router = inject(Router)

  public doChangePassword() {
    if(this.formGroup.valid ) {
      let password = this.formGroup.value;
      this.loginService.changePassword(password).subscribe(x => {
        alert("Se ha cambiado la contraseña")
        this.router.navigate(['/login'])
      },error => {
        let status:number = error.status
        if(status == 403) {
          console.log(error)
          alert("Las credenciales esta incorrectas")
        }
      } )
    }

  }

  ngOnInit(): void {
    let token = this.jwtService.getTokenFromLocalStorage();
    if(token != null) {
      this.formGroup = new FormGroup({
        contrasenya: new FormControl('',  Validators.required),
        con_contrasenya: new FormControl('', Validators.required)
      })
    } else {
      this.router.navigate(['login'])
    }
    
  }


}
function passwordEquals(value: any) {
  let password = value.contrasenya
  let confirmPassword = value.con_contrasenya

  return password === confirmPassword
}

