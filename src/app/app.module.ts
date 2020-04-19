import { SesionRepository } from './repositorios/sesion.repository';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginGuard } from './guards/login-guard.service';
import { ConfigService } from './servicios/config.service';
import { HttpClientModule } from '@angular/common/http';
import { ObtenerTelefonoComponent } from './componentes/obtener-telefono/obtener-telefono.component';
import { TelefonoGuard } from './guards/telefono-guard.service';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AppComponent,
    ObtenerTelefonoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatButtonModule,
  ],
  providers: [
    LoginGuard,
    TelefonoGuard,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          return appConfigService.loadConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
