import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiquidacionPageRoutingModule } from './liquidacion-routing.module';

import { LiquidacionPage } from './liquidacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LiquidacionPageRoutingModule
  ],
  declarations: [LiquidacionPage]
})
export class LiquidacionPageModule {}
