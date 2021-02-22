import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Proveedor } from "../models/provedor.model";

@Injectable({
    providedIn: 'root' 
})
export class DataService{
    private baseUrl:string = "https://dummyintegracion.herokuapp.com/";
    private getAllData:string ="readAllData";

    proveedores: Proveedor[]=[];

    private opts ={
        params: new HttpParams({fromString: "user=sprtanLA&categoria=proveedores"})
    };

    constructor(private httpClient:HttpClient){
    }

    getProveedores():Observable<any>{
        return this.httpClient.get(`${this.baseUrl}`+`${this.getAllData}`, this.opts);
    } 

    setProveedores(){
        
    }


}