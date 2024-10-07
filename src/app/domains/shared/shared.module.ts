import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoclienteComponent } from '../clientes/components/nuevocliente/nuevocliente.component';
import { ClienteComponent } from '../clientes/components/cliente/cliente.component';


@NgModule({
  declarations: [NuevoclienteComponent,ClienteComponent], // Decláralo aquí
  imports: [CommonModule],
  exports: [NuevoclienteComponent,ClienteComponent] // Expórtalo para usar en otros módulos
})
export class SharedModule { }