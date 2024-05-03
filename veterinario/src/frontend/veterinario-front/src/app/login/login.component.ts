import { Component, OnInit, inject } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
 

  loginService = inject(LoginServiceService)
  jwtService = inject(JwtService)
  formGroup!:FormGroup
  router = inject(Router)

  public doLogin() {
    
    if(this.formGroup.valid) {

      let login = this.formGroup.value;
      this.loginService.login(login).subscribe(x => {
        let token:string = (x as any).token;
        this.jwtService.setTokenToLocalStorage(token)
        this.router.navigate(['/main'])
        
      },error => {
        let status:number = error.status
        if(status == 403) {
          alert("Las credenciales esta incorrectas")
        }
      } )
    }

  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      contrasenya: new FormControl('', Validators.required)
    })
  }

}
