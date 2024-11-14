import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Combo } from 'src/app/domains/shared/models/combo.model';
import { Gasto } from 'src/app/domains/shared/models/gasto.model';

@Component({
  selector: 'app-nuevogasto',
  templateUrl: './nuevogasto.component.html',
  styleUrls: ['./nuevogasto.component.scss'],
})
export class NuevogastoComponent  implements OnInit {
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas

  @Input() gasto: Gasto | undefined;
  @Input() indice?: number;
  @Input() subGastos: Combo[] = []

  @Output() cancelar = new EventEmitter();
  @Output() guardar = new EventEmitter();



  constructor() { }

  ngOnInit() {}

  cancelarHandler(){
    this.cancelar.emit(this.gasto)
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
            this.guardar.emit(this.gasto)
          },
        },
      ],
    });

    await alert.present();

   
  }

}
