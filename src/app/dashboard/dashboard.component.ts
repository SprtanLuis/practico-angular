import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../models/provedor.model';
import { DataService } from '../services/data.service'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  provedores:Proveedor [] = [];

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    this.dataService.getProveedores().subscribe( 
      (res) => {
        res.forEach((element: { id: any; data:any;}) => {
          let proveedor = new Proveedor(element.id,element.data.nombre,element.data.apellido,element.data.empresa,element.data.status,element.data.telefono);
          this.provedores.push(proveedor);
        /* console.log(element.data.nombre);  */
        /* let item = new Proveedor(element.id, element.user, element.categoria, element.data);
        this.provedores.push(item); */
        /* console.log(element.id)
        console.log(element.data); */
      });
    });
    console.log(this.provedores);
  }

  recargarComponente(){
    this.provedores = [];
    this.ngOnInit();
  }

}
