import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss'],
})
export class ClienteComponent  implements OnInit {
  @Input() cliente: Cliente | undefined;
  @Input() indice?: number;

  @Output() editarDatos = new EventEmitter();

  constructor() { }

  ngOnInit() {}



  editarDatosHandler(){
    this.editarDatos.emit(this.cliente)
  }

  

}
