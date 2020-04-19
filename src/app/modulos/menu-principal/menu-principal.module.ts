import { SesionRepository } from './../../repositorios/sesion.repository';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalComponent } from './componentes/menu-principal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [MenuPrincipalComponent],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    SesionRepository
  ]
})
export class MenuPrincipalModule { }
