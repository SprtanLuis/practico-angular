import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { timeout } from 'rxjs/operators';
import { GuardService } from '../services/Guard.service';
import { ToastrService} from 'ngx-toastr';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl ('', [Validators.required,Validators.email]),
    password: new FormControl ('',[Validators.required])
  });

  formRegister = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    passwordAgain: new FormControl('', [Validators.required]),
    
  },{ validators: this.checkPasswords });

  get fRegister(){
    return this.formRegister.controls;
  }

  get fLogin(){
    return this.formLogin.controls;
  }

  constructor(private rutasService:Router, 
              private spinner:NgxSpinnerService, 
              private guardService: GuardService, 
              private toastr:ToastrService,
              private authService:AuthService){ 
  }

  ngOnInit(): void {
  }

  submitLogin(){
    this.spinner.show();
    const datos = this.formLogin.value;
    this.authService.validaCuenta(datos)
    .pipe(timeout(20000))
    .subscribe((response) =>{
      this.validaRespuestaL(response.status, response);
    },
     (response) => {
       this.validaRespuestaL(response.status,response);
     });
  }

  submitRegister(){
    this.spinner.show();
    const datos = this.formRegister.value;
    this.authService.creaCuenta(datos)
    .pipe(timeout(20000))
    .subscribe((response) =>{
      this.validaRespuestaR(response.status,response);
    }, (response) =>{
      this.validaRespuestaR(response.status,response);
    }
    );
  }


  validaRespuestaL(code: any, response: any){
    this.spinner.hide();
    switch(code){
      case 200:
        this.guardService.setLogeado(true);
        this.rutasService.navigate(['/dashboard']);
        break;
      default:
        this.guardService.setLogeado(false);
        this.toastr.error('Valide sus credenciales','¡Ups!',{timeOut: 4000});
        this.formLogin.reset();
        break;
    }
  }

  validaRespuestaR(code: any, response: any) {
    this.spinner.hide();
    switch (code) {
      case 200:
        this.toastr.success('Cuenta creada');
        this.formRegister.reset()
        this.rutasService.navigate(['/login']);
        break;
      default:
        this.toastr.error('Error al crear su cuenta', 'Ups!', {
          timeOut: 3000,
        });
        this.formRegister.reset()
        break;
    }
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  const password = group.controls.password.value;
  const confirmPassword = group.controls.passwordAgain.value
  return password === confirmPassword ? null : { notSame: true }     
  }



}
