import { Injectable, inject } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  private toastController = inject(ToastController)
  private loadingCtrl = inject(LoadingController)
  private toasts = inject(ToastrService)
  private alertController = inject(AlertController)

  constructor() { }


  async presentAlert(message:string){
    const alert = await this.toastController.create(
      {
        header:'',
        message : message,
        // duration : 3000,
        // icon:'',
        positionAnchor : 'header',
        position:'top',
        cssClass:'custom-toast'
      }
    )
    return alert
    
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create();
    return loading
  }

  async toastr(type :string,message : string,title : string){
    if (type == 'success') {
      this.toasts.success(message, title,{
        closeButton:true
        ,progressBar:true
        ,positionClass: 'toast-top-right',
      });
    }else if(type == 'error'){
      this.toasts.error(message, title,{
        closeButton:true
        ,progressBar:true
        ,positionClass: 'toast-top-right',
      });
    }else if(type == 'warning'){
      this.toasts.warning(message, title,{
        closeButton:true
        ,progressBar:true
        ,positionClass: 'toast-top-right',
      });
    }else if(type == 'info'){
      this.toasts.info(message, title,{
        closeButton:true
        ,progressBar:true
        ,positionClass: 'toast-top-right',
      });
    }
   
  }

}
