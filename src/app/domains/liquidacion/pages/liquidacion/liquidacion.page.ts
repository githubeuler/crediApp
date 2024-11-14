import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Gasto } from 'src/app/domains/shared/models/gasto.model';
import { PreLiquidacion } from 'src/app/domains/shared/models/preliquidacion.model';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { GastoService } from 'src/app/domains/shared/services/gasto.service';
import { GeneralService } from 'src/app/domains/shared/services/general.service';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';


@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.page.html',
  styleUrls: ['./liquidacion.page.scss'],
})
export class LiquidacionPage implements OnInit {

  private route = inject(Router)
  private gastoService = inject(GastoService)
  private generalService = inject(GeneralService)
  private prestamoService = inject(PrestamoService)
  private interfaceService = inject(InterfaceService)
  private router = inject(Router);
  
  preliquidacion! : PreLiquidacion 

  gastos = signal<Gasto[]>([])
  prestamos = signal<Prestamo[]>([])

  prestamosNuevos = computed(() => {
    const prestamos = this.prestamos()
    
    return prestamos
      .filter(prestamo => 
        prestamo.estado.toLowerCase() == 'NUEVO'
      );
  })

  titulo :string = ''
  user :any

  constructor() { }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
     
      this.user = JSON.parse(userData);
     
    }

    this.getGastos();
    this.getPreLiquidacion();
    this.getPrestamos()
  }

  closePage(){
    this.router.navigate(['/home'])
  }

  async getGastos(){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.gastoService.getGastosRuta(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            this.gastos.set(data.data)
          }
        },error:()=>{
          loading.dismiss()
        }
      }
    )
  }

  async getPrestamos(){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.prestamoService.getPrestamos(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            const list : Prestamo[] = data.data 
            const filtro = list.filter(p=>(p.estado === 'NUEVO'))
            this.prestamos.set(filtro)
          }
        },error:()=>{
          loading.dismiss()
        }
      }
    )
  }

 async  getPreLiquidacion(){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.generalService.getPreLiquidacion(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            console.log(data.data)
            this.preliquidacion = data.data
          }
        },error:()=>{
          loading.dismiss()
        }
      }
    )
  }

  irGastos(){
    this.titulo ='Gastos'
  }

  irPrestamos(){
    this.titulo ='Prestamos'
  }

  totalizar(){
    this.preliquidacion.faltanteGenerado = 0
    this.preliquidacion.sobranteGenerado = 0
    const valor = (this.preliquidacion.realEntregar - this.preliquidacion.entregaEfectivo)
    const flg = valor > 0
    console.log(valor)
    if (flg) {
      this.preliquidacion.faltanteGenerado = Math.abs(valor)
    }else {
      this.preliquidacion.sobranteGenerado = Math.abs(valor)
    }
  }

  // validarNumero(numero: number): boolean {
  //   if (numero > 0) {
  //     return true;
  //   } else if (numero < 0) {
  //     return false;
  //   }
  // }
}
