import { ObtenerTelefonoComponent } from './componentes/obtener-telefono/obtener-telefono.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: ObtenerTelefonoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObtenerTelefonoRoutingModule { }
