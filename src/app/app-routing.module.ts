import { LoginGuard } from './guards/login-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelefonoGuard } from './guards/telefono-guard.service';


const routes: Routes = [
  { path: '',
    loadChildren: () => import('./modulos/menu-principal/menu-principal.module').then(m => m.MenuPrincipalModule),
    canActivate: [LoginGuard, TelefonoGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modulos/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'telefono',
    loadChildren: () => import('./modulos/obtener-telefono/obtener-telefono.module').then(m => m.ObtenerTelefonoModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
