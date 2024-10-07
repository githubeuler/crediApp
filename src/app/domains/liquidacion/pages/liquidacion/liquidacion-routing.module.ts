import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiquidacionPage } from './liquidacion.page';

const routes: Routes = [
  {
    path: '',
    component: LiquidacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LiquidacionPageRoutingModule {}
