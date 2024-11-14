import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';
import { PrestamoService } from 'src/app/domains/shared/services/prestamo.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  private router = inject(Router)
  private interfaceService = inject(InterfaceService)
  private prestamoService = inject(PrestamoService)

  user : any;
  prestamos = signal<Prestamo[]>([]); // Nueva señal para la prestamos

  constructor() { }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
    this.getPrestamos()
  }

  closePage(){
    this.router.navigate(['/home']);
  }

  async getPrestamos() {
    //  return this.data.getPrestamos();
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.prestamoService.getPrestamos(this.user.idRuta).subscribe(
      {
        next:(data)=>{
          loading.dismiss()

          this.prestamos.set(data.data)

        },error:(err) =>{
          loading.dismiss()
          console.log(err)
        },
      }
    )
  }

  reordenar(event: any) {
    // Reordena el arreglo según el nuevo orden
    const itemMover = this.prestamos().splice(event.detail.from, 1)[0];
    this.prestamos().splice(event.detail.to, 0, itemMover);
    event.detail.complete();
  }

  async guardarOrden() {
    // Crear un array con idPrestamo y prioridad basado en el nuevo orden
    const prestamosConPrioridad = this.prestamos().map((prestamo, index) => ({
      idPrestamo: prestamo.idPrestamo,
      prioridad: index + 1
    }));
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.prestamoService.ordenarPrestamos(prestamosConPrioridad).subscribe({
      next:(data)=>{
        if (data.succeeded == true) {
          this.interfaceService.toastr('success','Se guardo el orden correctamente','Mensaje')
          loading.dismiss()
        }
      }
    })

    
  }

}
