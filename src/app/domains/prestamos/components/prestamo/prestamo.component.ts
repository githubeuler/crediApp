import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';

import { DataPrestamoService } from 'src/app/domains/shared/services/data.prestamo.service';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss']
})
export class PrestamoComponent  implements OnInit {

  private router = inject(Router)
  private dataPrestamo = inject(DataPrestamoService)

  @Input() prestamo?: Prestamo;
  @Input() indice?: number;

  @Output() showPayInput = new EventEmitter();
  @Output() hidePayInput = new EventEmitter();
  @Output() pagarPrestamo = new EventEmitter();



  constructor() { 
  }

  ngOnInit() {

  }

  showPayInputHandler(){
    this.showPayInput.emit(this.prestamo)
  }

  hidePayInputHandler(){
    this.hidePayInput.emit(this.prestamo)
  }

  pagarPrestamoHandler(){
    console.log(this.prestamo)
    this.pagarPrestamo.emit(this.prestamo)
  }

  showDetail(){
    this.dataPrestamo.setPrestamo(this.prestamo);
    this.router.navigate(['/detail'])
  }

}
