import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPrincipalComponent } from './componentes/menu-principal.component';

const routes: Routes = [
  {
    path: '',
    component: MenuPrincipalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuPrincipalRoutingModule { }
