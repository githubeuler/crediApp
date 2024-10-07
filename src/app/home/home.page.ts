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
  constructor() {}

menu : Menu[] = [
  {
    idMenu : 1,
    nombre:  'Prestamos',
    descripcion:'',
    ruta:'prestamo',
    icono :'cash-outline',
    color:''

  },
  {
    idMenu : 1,
    nombre:  'Clientes',
    descripcion:'',
    ruta:'cliente',
    icono :'people-outline',
    color:''

  },
  {
    idMenu : 1,
    nombre:  'Gastos',
    descripcion:'',
    ruta:'gasto',
    icono :'file-tray-full-outline',
    color:''

  },
  {
    idMenu : 1,
    nombre:  'Liquidacion',
    descripcion:'',
    ruta:'liquidacion',
    icono :'cash-outline',
    color:''

  }
]

  // Navega a la página correspondiente
  goToPage(page: string) {
    this.router.navigate([`/${page}`]);
  }

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
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
