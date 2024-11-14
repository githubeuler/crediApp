import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoclienteComponent } from '../../clientes/components/nuevocliente/nuevocliente.component';
import { ClienteComponent } from '../../clientes/components/cliente/cliente.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GastoComponent } from '../../gastos/components/gasto/gasto.component';
import { NuevogastoComponent } from '../../gastos/components/nuevogasto/nuevogasto.component';


@NgModule({
  declarations: [NuevoclienteComponent,ClienteComponent,GastoComponent,NuevogastoComponent], // Declara el componente aquí
  imports: [CommonModule,
    FormsModule,
    IonicModule,],
  exports: [NuevoclienteComponent,ClienteComponent,GastoComponent,NuevogastoComponent] // Expórtalo para que pueda ser usado en otros módulos
})
export class SharedModule { }
