import { TwoFactorGuard } from './guards/two-factor-guard.service';
import { TwoFactorRoutingModule } from './two-factor-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwoFactorRepository } from 'src/app/repositorios/two-factor.repositoy';
import { TwoFactorComponent } from './two-factor/two-factor.component';
import { MatButtonModule } from '@angular/material/button';
import { TwoFactorActivarComponent } from './two-factor-activar/two-factor-activar.component';
import { TwoFactorNuevoComponent } from './two-factor-nuevo/two-factor-nuevo.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxMaskModule } from 'ngx-mask';
import { options } from '../obtener-telefono/obtener-telefono.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import { QRCodeModule } from "angularx-qrcode";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    TwoFactorComponent,
    TwoFactorActivarComponent,
    TwoFactorNuevoComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDividerModule,
    TwoFactorRoutingModule,
    QRCodeModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(options),
    MatToolbarModule,
    QRCodeModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatListModule
  ],
  providers: [
    TwoFactorRepository,
    TwoFactorGuard
  ]
})
export class TwoFactorModule { }
