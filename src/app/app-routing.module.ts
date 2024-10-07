import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'message/:id',
    loadChildren: () => import('./view-message/view-message.module').then( m => m.ViewMessagePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'prestamo',
    loadChildren: () => import('./domains/prestamos/pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'cliente',
    loadChildren: () => import('./domains/clientes/pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'gasto',
    loadChildren: () => import('./domains/gastos/pages/list/list.module').then( m => m.ListPageModule)
  },
  {
    path: 'liquidacion',
    loadChildren: () => import('./domains/liquidacion/pages/liquidacion/liquidacion.module').then( m => m.LiquidacionPageModule)
  },
  {
    path: 'nuevoprestamo',
    loadChildren: () => import('./domains/prestamos/pages/new/new.module').then( m => m.NewPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
