import { ErrorhandlerService } from './../../servicios/errorhandler.service';
import { SesionRepository } from './../../repositorios/sesion.repository';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuPrincipalRoutingModule } from './menu-principal-routing.module';
import { MenuPrincipalComponent } from './componentes/menu-principal.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CodigoRepository } from 'src/app/repositorios/codigo.repository';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import {MatSidenavModule} from '@angular/material/sidenav';
import { FactorGuard } from './guard/factor-guard.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [MenuPrincipalComponent],
  imports: [
    CommonModule,
    MenuPrincipalRoutingModule,
    MatSnackBarModule,
    MatIconModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule
  ],
  providers: [
    SesionRepository,
    CodigoRepository,
    ErrorhandlerService,
    UsuarioService,
    FactorGuard
  ]
})
export class MenuPrincipalModule { }
