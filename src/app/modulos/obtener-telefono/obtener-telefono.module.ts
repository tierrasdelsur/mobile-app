import { TelefonoService } from './../../servicios/telefono.service';
import { ObtenerTelefonoComponent } from './componentes/obtener-telefono/obtener-telefono.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObtenerTelefonoRoutingModule } from './obtener-telefono-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ErrorhandlerService } from 'src/app/servicios/errorhandler.service';
import {MatToolbarModule} from '@angular/material/toolbar';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};


@NgModule({
  imports: [
    CommonModule,
    ObtenerTelefonoRoutingModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
    NgxMaskModule.forRoot(options),
  ],
  declarations: [ObtenerTelefonoComponent],
  providers: [
    TelefonoService,
    ErrorhandlerService
  ]
})
export class ObtenerTelefonoModule { }
