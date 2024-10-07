import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Prestamo } from 'src/app/domains/shared/models/prestamo.model';

@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.component.html',
  styleUrls: ['./prestamo.component.scss'],
})
export class PrestamoComponent  implements OnInit {
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

}
