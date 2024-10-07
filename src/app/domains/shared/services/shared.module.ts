import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoclienteComponent } from '../../clientes/components/nuevocliente/nuevocliente.component';
import { ClienteComponent } from '../../clientes/components/cliente/cliente.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [NuevoclienteComponent,ClienteComponent], // Declara el componente aquí
  imports: [CommonModule,
    FormsModule,
    IonicModule,],
  exports: [NuevoclienteComponent,ClienteComponent] // Expórtalo para que pueda ser usado en otros módulos
})
export class SharedModule { }
