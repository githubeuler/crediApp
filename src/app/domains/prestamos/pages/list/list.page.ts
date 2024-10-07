import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { DataPrestamoService } from 'src/app/domains/shared/services/data.prestamo.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';
import { AlertController,ToastController } from '@ionic/angular';  // Importamos AlertController
import { Router } from '@angular/router';


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

  private route = inject(Router);

  filtro = signal<'TODOS'|'PENDIENTE'|'PAGADO'|'NUEVO'>('TODOS') // Nueva señal para los filtros
  prestamos = signal<Prestamo[]>([]); // Nueva señal para la prestamos
  searchTerm = signal<string>(''); // Nueva señal para la búsqueda
  flgCobro = signal<number>(0); // Nueva señal para la búsqueda

  flagResponsePrestamo = false;

  constructor() { }

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

  ngOnInit() {
    this.getPrestamos()
  }

  // refresh(ev: any) {
  //   setTimeout(() => {
      
  //   }, 3000);

  // }
  


  async getPrestamos() {
    //  return this.data.getPrestamos();
    this.prestamoService.getPrestamos().subscribe(
      {
        next:(data)=>{
          this.flagResponsePrestamo = true
          console.log(data.data)
          this.prestamos.set(data.data)
          
        },error:(err) =>{
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
    const query = event.target.value;
    this.searchTerm.set(query); // Actualiza el término de búsqueda
  }

  showPayInput(index: number) {
    console.log('click')
    // Cambia el estado de isPaying a true para mostrar el input en la fila seleccionada
    const updatedPrestamos = this.prestamos().map((prestamo, i) => {
      return i === index ? { ...prestamo, isPago: true } : prestamo;
    });
    this.prestamos.set(updatedPrestamos);
  }

  hidePayInput(index: number) {
    console.log('click')
    // Cambia el estado de isPaying a true para mostrar el input en la fila seleccionada
    const updatedPrestamos = this.prestamos().map((prestamo, i) => {
      return i === index ? { ...prestamo, isPago: false } : prestamo;
    });
    this.prestamos.set(updatedPrestamos);
  }

  async pagarPrestamo(prestamo : Prestamo){

    console.log(prestamo.abono)

    if (prestamo.abono != prestamo.cuota) {
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
  

  }

  async pagoPrestamoHandler(prestamo : Prestamo){
    
    this.prestamoService.insertaPagoPrestamo(prestamo.idPrestamo, prestamo.abono).subscribe({
      next: (response) => {
        console.log('respose:', response);
        console.log('Pago confirmado:', prestamo.abono);
        prestamo.estado = 'PAGADO';
        prestamo.cuotasPagadas += 1
        prestamo.cuotasPendientes -= 1
        prestamo.saldo -= prestamo.abono  
        prestamo.pagoDia = prestamo.abono
        prestamo.isPago = false;
        prestamo.isPagando = false
        this.flgCobro.set(prestamo.abono)
      },
      error: (error) => {
        prestamo.isPagando = false
        console.error('Error en el pago:', error);
      },
    });

  }

  nuevoPrestamo(){
  this.route.navigate(['/nuevoprestamo'])
  }

}
