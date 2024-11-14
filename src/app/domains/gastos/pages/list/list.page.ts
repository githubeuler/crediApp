import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Combo } from 'src/app/domains/shared/models/combo.model';
import { Gasto } from 'src/app/domains/shared/models/gasto.model';
import { GastoService } from 'src/app/domains/shared/services/gasto.service';
import { GeneralService } from 'src/app/domains/shared/services/general.service';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private gastoService = inject(GastoService);
  private generalService = inject(GeneralService);
  private interfaceService = inject(InterfaceService);
  private router = inject(Router);

  gastos = signal<Gasto[]>([]);
  subGastos = signal<Combo[]>([]);
  searchTerm = signal<string>('');


  gastosByfilter = computed(() => {

    const gastos = this.gastos()
    const term = this.searchTerm().toLowerCase();
    
    return gastos
      .filter(gasto => 
        gasto.nombre.toLowerCase().includes(term) // Filtra por nombre
      );
  })

  constructor() { }
user :any
  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
     
      this.user = JSON.parse(userData);
     
    }

    this.getSubGastos()
    this.getGastos()
  }

  closePage(){
    this.router.navigate(['/home'])
  }

  async getGastos() {
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.gastoService.getGastosRuta(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            console.log(data.data)
            this.gastos.set(data.data)
          }
       
          
        },error:(err) =>{
          loading.dismiss()
          console.log(err)
        },
      }
    )
  }

  onSearch(event: any) {
    const query = event.target.value;
    this.searchTerm.set(query); // Actualiza el término de búsqueda
  }
  IsCreateGasto : boolean = false
  nuevoGasto(){
    
    const nuevoGasto : Gasto  = {
      idGastoRuta:0,
      idGasto: 0,
      concepto:'',
      fechaCrecion : '',
      monto : undefined,
      nombre : '',
      isEditando: true
    };
     if (!this.IsCreateGasto) {
      this.IsCreateGasto = true

      const ListaConNuevoItem = [nuevoGasto, ...this.gastos()];
      this.gastos.set(ListaConNuevoItem);  // Actualizar la signal con el nuevo array
     }
    //else{
    //   const ListaConNuevoItem = [nuevoCliente, ...this.gastos()];
    //   this.gastos.set(ListaConNuevoItem);  // Actualizar la signal con el nuevo array
    // }

   
  }

  async getSubGastos() {
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    // TipoGasto = 1 OPERACIONAL
    this.generalService.getCombo("GASTO","1").subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            console.log(data.data)
            this.subGastos.set(data.data)
          }
       
          
        },error:(err) =>{
          loading.dismiss()
          console.log(err)
        },
      }
    )
  }

  cancelar(gasto : Gasto){
    if (gasto.idGastoRuta == 0) {
      const gastosActualizados = this.gastos().filter(cli => cli.idGastoRuta !== gasto.idGastoRuta);
      this.gastos.set(gastosActualizados);
    }
    this.IsCreateGasto = false
    gasto.isEditando = false;
  }
  async guardar(gasto : Gasto){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
      this.gastoService.insertaGastoRuta(this.user.idRuta,gasto.idGasto,gasto.monto,gasto.concepto,this.user.idUsuario,true).subscribe(
        {
          next:(data)=>{
            loading.dismiss()
            if (data.succeeded == true) {
              this.interfaceService.toastr('success','Registro guardado',':)')
              this.IsCreateGasto = false
              this.getGastos()
            }else{
              this.interfaceService.toastr('error',data.message,':(')
            }
            
          },error:(data)=>{
            this.interfaceService.toastr('error',data.error,':(')
            loading.dismiss()
          }
        }
      )
  }
  // cambiarSubGasto(event : any){
  //   const opcionSeleccionada = this.tipoPagos().find(opcion => opcion.id === event.detail.value);
  //   console.log(opcionSeleccionada)
  //   this.cuotas = Number(opcionSeleccionada?.value1)
  // }

}
