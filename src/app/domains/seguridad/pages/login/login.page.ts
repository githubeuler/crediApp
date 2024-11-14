import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { InterfaceService } from 'src/app/domains/shared/services/interface.service';
import { UsuarioService } from 'src/app/domains/shared/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private usuarioService = inject(UsuarioService)
  private router = inject(Router)
  private navController = inject(NavController)
  private location = inject(Location)
  private interfaceService = inject(InterfaceService)
  private platform = inject(Platform)

  private toast = inject(InterfaceService)
  data = {username:'',password:'',code:''}
  logueando :boolean =false


  constructor() {

  }

  async login() {
    // const alert = await this.toast.presentAlert('')
    // alert.present()
    const loading = await this.interfaceService.showLoading()
    loading.message = 'Validando usuario..'
    loading.present()
    this.logueando = !this.logueando
    console.log(this.data.username,this.data.password)
    this.usuarioService.Auth(this.data.username,this.data.password,this.data.code,'APP').subscribe({
      next:(data)=>{
        console.log(data)
        loading.dismiss();
        if (data.succeeded == true) {
          localStorage.setItem('user', JSON.stringify(data.data));
          this.navController.navigateRoot(['/home'],{replaceUrl :true});
        }else{
          this.logueando = !this.logueando
          this.interfaceService.toastr('error',data.message,'Mensaje')

        }
      },
      error:(data)=>{
        loading.dismiss();
        console.log(data)
        this.logueando = !this.logueando
        this.interfaceService.toastr('error',data.error.Message,'Mensaje')
      },
      complete:()=>{

      }
    })
    // if (this.data.username === 'admin' && this.data.password === '222222') {
    //   this.navController.navigateRoot(['/home'],{replaceUrl :true}); // Redirigir a la página principal
    //   this.location.replaceState('/home');
    // } else {
    //   // alert('Invalid credentials');
    // }
  }
  ionViewWillEnter() {

  }
  ngOnInit() {
    
  }

}
