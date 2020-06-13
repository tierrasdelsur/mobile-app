import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalComponent } from './componentes/menu-principal.component';
import { FactorGuard } from './guard/factor-guard.service';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent,
    canActivate: [FactorGuard]
  },
  {
    path: 'factor',
    loadChildren: () => import('../two-factor/two-factor.module').then(m => m.TwoFactorModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
