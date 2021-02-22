import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs"
import { map } from "rxjs/operators"

@Injectable({
 providedIn: 'root' 
})
export class AuthService{
    private baseUrl:string = "https://dummyintegracion.herokuapp.com/";
    private login:string ="validaAccount";
    private create:string = "createAccount";

    constructor(private httpClient: HttpClient){
    }

    validaCuenta=(form:any):Observable<any>=>{
      const options={
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET, POST, DELETE, PUT',
          'Access-Control-Allow-Headers':'X-Requests-With,content-type'
        }),
        observe: 'response' as 'response'
      };
      return this.httpClient.post(`${this.baseUrl}`+`${this.login}`,JSON.stringify(form),options).pipe(map(res=>res));
    }

    creaCuenta=(form:any):Observable<any>=>{
      const options={
        headers:new HttpHeaders({
          'Content-Type':'application/json',
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods':'GET, POST, DELETE, PUT',
          'Access-Control-Allow-Headers':'X-Requests-With,content-type'
        }),
        observe: 'response' as 'response'
      };
      return this.httpClient.post(`${this.baseUrl}`+`${this.create}`,JSON.stringify(form),options).pipe(map(res=>res));
    }


}