import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataPrestamoService } from 'src/app/domains/shared/services/data.prestamo.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';
import { Prestamo } from 'src/app/services/data.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  private router = inject(Router)
  private dataPrestamo = inject(DataPrestamoService)
  private prestamoService = inject(PrestamoService);

  prestamo? : any
  detalle : any
  montoPagado : number = 0
  constructor() { }

  ngOnInit() {
    this.prestamo = this.dataPrestamo.getPrestamo();
    
    this.getDetallePrestamo()
  }

  closePage(){
    this.router.navigate(['/prestamo']);
  }
  getDetallePrestamo(){
    const idPrestamo = this.prestamo == undefined ? 0 : this.prestamo?.idPrestamo
    this.prestamoService.getPrestamoDetalle(idPrestamo).subscribe({
      next:(response)=>{
        console.log(this.detalle)
       if (response.succeeded == true) {
        this.detalle = response.data

        this.montoPagado =this.detalle.reduce((total : any, detalle : any) => total + detalle.montoPagado, 0);
        
       }
        
      }
    })
  }

}
