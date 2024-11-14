import { Component, EventEmitter, Input, OnInit, Output, inject, signal } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Cliente } from 'src/app/domains/shared/models/cliente.model';
import { Combo } from 'src/app/domains/shared/models/combo.model';
import { GeneralService } from 'src/app/domains/shared/services/general.service';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';

@Component({
  selector: 'app-nuevocliente',
  templateUrl: './nuevocliente.component.html',
  styleUrls: ['./nuevocliente.component.scss'],
})
export class NuevoclienteComponent  implements OnInit {
  private alertController = inject(AlertController); // Inyectamos el controlador de alertas
  private generalService = inject(GeneralService)
  private interfaceService = inject(InterfaceService)

  @Input() cliente: Cliente | undefined;
  @Input() indice?: number;

  @Output() cancelar = new EventEmitter();
  @Output() guardar = new EventEmitter();

  tipoDocumentos = signal<Combo[]>([]);

  constructor() {
  }

  async ngOnInit() {
    if (this.cliente?.idCliente == 0) {
      this.loadTipoDocumento();
    }

  }

  async loadTipoDocumento(){
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Espere por favor...'
    loading.present()
    this.generalService.getCombo("TIPODOCUMENTO",'1').subscribe(
      {
        next:(data)=>{
          loading.dismiss()
          if (data.succeeded == true) {
            this.tipoDocumentos.set(data.data)
           
            console.log(this.tipoDocumentos())
          }
           
        },error:()=>{
          loading.dismiss()
        }
      }
    )
  }

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
