import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './domains/shared/guardia/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'prestamo',
    loadChildren: () => import('./domains/prestamos/pages/list/list.module').then( m => m.ListPageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: 'cliente',
    loadChildren: () => import('./domains/clientes/pages/list/list.module').then( m => m.ListPageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: 'gasto',
    loadChildren: () => import('./domains/gastos/pages/list/list.module').then( m => m.ListPageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: 'liquidacion',
    loadChildren: () => import('./domains/liquidacion/pages/liquidacion/liquidacion.module').then( m => m.LiquidacionPageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: 'nuevoprestamo',
    loadChildren: () => import('./domains/prestamos/pages/new/new.module').then( m => m.NewPageModule)
    ,canActivate: [authGuard] 
  },
  {
    path: 'login',
    loadChildren: () => import('./domains/seguridad/pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./domains/prestamos/pages/detail/detail.module').then( m => m.DetailPageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./domains/prestamos/pages/order/order.module').then( m => m.OrderPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
