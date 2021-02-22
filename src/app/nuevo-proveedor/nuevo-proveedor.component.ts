import { Component, OnInit,} from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-nuevo-proveedor',
  templateUrl: './nuevo-proveedor.component.html',
  styleUrls: ['./nuevo-proveedor.component.css']
})
export class NuevoProveedorComponent implements OnInit {
  
  constructor( dataService:DataService) { }

  ngOnInit(): void {
  }

}
