import { TwoFactorComponent } from './two-factor/two-factor.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TwoFactorActivarComponent } from './two-factor-activar/two-factor-activar.component';
import { TwoFactorNuevoComponent } from './two-factor-nuevo/two-factor-nuevo.component';
import { TwoFactorGuard } from './guards/two-factor-guard.service';


const routes: Routes = [
  {
    path: '',
    component: TwoFactorComponent,
    canActivate: [TwoFactorGuard]
  },
  {
    path: 'activar',
    component: TwoFactorActivarComponent
  },
  {
    path: 'reactivar',
    component: TwoFactorNuevoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TwoFactorRoutingModule {}
