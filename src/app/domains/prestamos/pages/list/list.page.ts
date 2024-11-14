import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { DataPrestamoService } from 'src/app/domains/shared/services/data.prestamo.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';
import { AlertController,ToastController } from '@ionic/angular';  // Importamos AlertController
import { Router } from '@angular/router';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {

  private dataService = inject(DataPrestamoService);
  private prestamoService = inject(PrestamoService);
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas
  private toastController = inject(ToastController); // Inyectamos el controlador de toast
  private interfaceService = inject(InterfaceService);

  private router = inject(Router);

  filtro = signal<'TODOS'|'PENDIENTE'|'PAGADO'|'NUEVO'>('TODOS') // Nueva señal para los filtros
  prestamos = signal<Prestamo[]>([]); // Nueva señal para la prestamos
  searchTerm = signal<string>(''); // Nueva señal para la búsqueda
  flgCobro = signal<number>(0); // Nueva señal para la búsqueda
  fechaRuta : string = ''

  flagResponsePrestamo = false;

  faltanCobrar: number = 0;
  progresoCobro: number = 0;
  colorBarra=''

  cobrados=0
  totalCreditos=0

  constructor() {
    
   }

  cobrado = computed(() => {
    const prestamos = this.prestamos()
    const cobro = this.flgCobro()
    return prestamos.reduce((total, prestamo) => total + prestamo.pagoDia, 0);
  })

  prestamosByfilter = computed(() => {

    const filter = this.filtro()
    const prestamos = this.prestamos()
    const term = this.searchTerm().toLowerCase();
    
    return prestamos
      .filter(prestamo => 
        (filter === 'TODOS' || prestamo.estado === filter) &&
        prestamo.cliente.toLowerCase().includes(term) // Filtra por cliente
      );
  })
  user : any;
  ngOnInit() {
   
   
    // this.getPrestamos()
    // this.filtro.set('PENDIENTE')
  }

  ionViewWillEnter() {
    const userData = localStorage.getItem('user');
    if (userData) {
    
      this.user = JSON.parse(userData);
    
      this.fechaRuta = this.user.fechaRuta
     
    }
    this.getPrestamos()
   
    
    
  }

  closePage(){
    this.router.navigate(['/home'])
  }

  // refresh(ev: any) {
  //   setTimeout(() => {
      
  //   }, 3000);

  // }
  


  async getPrestamos() {
    //  return this.data.getPrestamos();
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.prestamoService.getPrestamos(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          this.flagResponsePrestamo = true
          console.log(data.data)
          this.prestamos.set(data.data)

          
          this.totalCreditos = this.prestamos().length
          this.cobrados = this.prestamos().filter(m=>m.estado == 'PAGADO').length
          this.faltanCobrar = this.prestamos().length - this.prestamos().filter(m=>m.estado == 'PAGADO').length;
          this.progresoCobro = this.prestamos().filter(m=>m.estado == 'PAGADO') .length / this.prestamos().length;

          
          // Asigna color según el progreso
          if (this.progresoCobro < 0.5) {
            this.colorBarra = 'danger'; // Rojo si es menor al 50%
          } else if (this.progresoCobro >= 1) {
            this.colorBarra = 'success'; // Amarillo si es exactamente 50%
          // } else if (this.progresoCobro === 1) {
          //   this.colorBarra = 'success'; // Verde si es 100%
          } else {
            this.colorBarra = 'warning'; // Color predeterminado para otros porcentajes
          }
          
          this.filtro.set('PENDIENTE')
        },error:(err) =>{
          loading.dismiss()
          this.flagResponsePrestamo = true

          console.log(err)
        },
      }
    )
  }

  changeFilter(filter : 'TODOS'|'PENDIENTE'|'PAGADO'|'NUEVO'){
    this.filtro.set(filter)
  }

  onSearch(event: any) {

    this.filtro.set('TODOS')
    const query = event.target.value;
    this.searchTerm.set(query); // Actualiza el término de búsqueda
  }

  showPayInput(prestamo: Prestamo) {
    console.log('click')
    // Cambia el estado de isPaying a true para mostrar el input en la fila seleccionada
    // const updatedPrestamos = this.prestamos().map((prestamo, i) => {
    //   return i === index ? { ...prestamo, isPago: true } : prestamo;
    // });
    // this.prestamos.set(updatedPrestamos);
    prestamo.isPago = true;

  }

  hidePayInput(prestamo: Prestamo) {
    console.log('click')
    // Cambia el estado de isPaying a true para mostrar el input en la fila seleccionada
    // const updatedPrestamos = this.prestamos().map((prestamo, i) => {
    //   return i === index ? { ...prestamo, isPago: false } : prestamo;
    // });
    // this.prestamos.set(updatedPrestamos);
    prestamo.isPago = false;
  }

  async pagarPrestamo(prestamo : Prestamo){

    console.log(prestamo.abono)

    if (prestamo.abono != prestamo.cuota) {
      if (prestamo.abono > prestamo.saldo) {
        this.interfaceService.toastr('warning','El monto a pagar no puede ser mayor a ' + String(prestamo.saldo) ,'Mensaje')
        return false;
      }

      const alert = await this.alertController.create({
        header: 'Confirmar Pago',
        message: `¿Estás seguro de pagar el monto de ${prestamo.abono}?`,
        buttons: [
          {
            text: 'NO',
            role: 'cancel',
            handler: () => {
              console.log('Pago cancelado');
            },
          },
          {
            text: ' SI ',
            cssClass:'bYes',
            handler: () => {
              // Proceder con el pago
          prestamo.isPagando = true
          this.pagoPrestamoHandler(prestamo)
             
            
  
              
            },
          },
        ],
      });
  
      await alert.present();

    }else{
      prestamo.isPagando = true
      this.pagoPrestamoHandler(prestamo)
    }
  
    return true
  }

  async pagoPrestamoHandler(prestamo : Prestamo){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    prestamo.abono = (prestamo.idDetallePrestamo > 0 ? prestamo.pagoDia : prestamo.abono)
    this.prestamoService.insertaPagoPrestamo(prestamo.idDetallePrestamo,prestamo.idPrestamo,prestamo.abono,this.user.idUsuario).subscribe({
      next: (response) => {
        loading.dismiss()
        if (response.succeeded == true) {
          console.log('respose:', response);
          console.log('Pago confirmado:', prestamo.abono);
          // prestamo.estado = 'PAGADO';
          // if (prestamo.idDetallePrestamo == 0) {
          //   prestamo.cuotasPagadas += 1
          //   prestamo.cuotasPendientes -= 1
          //   prestamo.saldo -= prestamo.abono
          //   prestamo.pagoDia = prestamo.abono
          //   this.changeFilter('PENDIENTE')
          // }else{
          //   prestamo.isPago = false;
          //   prestamo.isPagando = false
          //   this.flgCobro.set(prestamo.abono)
           
          //   this.changeFilter('PAGADO')
          // }
          this.getPrestamos()
         
          // this.filtro.update(value=>value='PENDIENTE')
        }else{
          console.error('Error en el pago:', response);
        }
        
      },
      error: (error) => {
        loading.dismiss()
        prestamo.isPagando = false
        console.error('Error en el pago:', error);
      },
    });

  }

  nuevoPrestamo(){
  this.router.navigate(['/nuevoprestamo'])
  }

}
