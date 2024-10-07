import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.scss'],
})
export class NuevoclienteComponent  implements OnInit {
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas

  @Input() cliente: Cliente | undefined;
  @Input() indice?: number;

  @Output() cancelar = new EventEmitter();
  @Output() guardar = new EventEmitter();



  constructor() {
  }

  ngOnInit() {}

  cancelarHandler(){
    this.cancelar.emit(this.cliente)
  }


  async guardarHandler(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: `¿Estás seguro de grabar los datos?`,
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
           
          },
        },
        {
          text: ' SI ',
          cssClass:'bYes',
          handler: () => {
            this.guardar.emit(this.cliente)
          },
        },
      ],
    });

    await alert.present();

   
  }

}
