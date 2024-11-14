import { Component, OnInit, SimpleChanges, computed, inject, signal } from '@angular/core';
import { RefresherCustomEvent } from '@ionic/angular';
import { MessageComponent } from '../message/message.component';

import { DataService, Message, Prestamo } from '../services/data.service';
import { PrestamoService } from '../services/prestamo.service';
import { Router } from '@angular/router';
import { Menu } from '../domains/shared/models/menu.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit  {
  router = inject(Router)
  user: any;
  nombre : string =''

  constructor() {}

menu : Menu[] = [
  {
    idMenu : 1,
    nombre:  'Prestamos',
    descripcion:'',
    ruta:'prestamo',
    icono :'cash-outline',
    color:'success'

  },
  {
    idMenu : 1,
    nombre:  'Clientes',
    descripcion:'',
    ruta:'cliente',
    icono :'people-outline',
    color:'primary'

  },
  {
    idMenu : 1,
    nombre:  'Gastos',
    descripcion:'',
    ruta:'gasto',
    icono :'file-tray-full-outline',
    color:'secondary'

  },
  {
    idMenu : 1,
    nombre:  'Liquidacion',
    descripcion:'',
    ruta:'liquidacion',
    icono :'checkmark-circle-outline',
    color:'tertiary'

  },
  {
    idMenu : 1,
    nombre:  'Enrutar',
    descripcion:'',
    ruta:'order',
    icono :'reorder-four-outline',
    color:'warning'

  }
]

// contacts = [
//   { name: 'Plinear a contacto', image: 'assets/plin.png' },
//   { name: 'Iris Ramírez', image: 'assets/iris.png' },
//   { name: 'Jorge Tuesta', image: 'assets/jorge.png' },
//   { name: 'Jerry Boy', image: 'assets/jerry.png' }
// ];

// products = [
//   { name: 'Mi Billete', info: 'Saldo disponible', icon: 'assets/piggy-bank.png' },
//   { name: 'The Platinum Card', info: 'Línea disponible', icon: 'assets/credit-card.png' },
//   { name: 'trabaja perro', info: 'Línea disponible', icon: 'assets/credit-card.png' },
//   { name: 'IBK Visa Access', info: 'Línea disponible', icon: 'assets/credit-card.png' }
//   ];


  // Navega a la página correspondiente
  goToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  logout() {
    // Limpiar el localStorage
    localStorage.removeItem('user');

    // Redirigir al login y limpiar el historial de navegación
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  ngOnInit() {

    const userData = localStorage.getItem('user');
    if (userData) {
     
      this.user = JSON.parse(userData);
      this.nombre = this.user.nombres

    }


    // // Use matchMedia to check the user preference
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // // Initialize the dark palette based on the initial
    // // value of the prefers-color-scheme media query
    // this.initializeDarkPalette(prefersDark.matches);

    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
    
  }

  paletteToggle = false;
  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark : boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev : any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd:boolean) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

}
