import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  logeado=false;

  setLogeado(estatus:any){
    this.logeado=estatus;
  }

  getLogeado(){
    return this.logeado;
  }

  canActivate():boolean{
    if(this.logeado==true){
      return true;
    }else{
      this.rutas.navigate(['/']);
      return false;
    }
  }


  constructor(private rutas: Router) { }
}