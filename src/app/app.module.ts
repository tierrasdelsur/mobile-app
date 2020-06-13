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
import { TelefonoGuard } from './guards/telefono-guard.service';
import { ObtenerTelefonoModule } from './modulos/obtener-telefono/obtener-telefono.module';
import { PreferenciasRepository } from './repositorios/preferencias.repository';
import { TelefonoService } from './servicios/telefono.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    ObtenerTelefonoModule
  ],
  providers: [
    LoginGuard,
    TelefonoGuard,
    ConfigService,
    TelefonoService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [ConfigService],
      useFactory: (appConfigService: ConfigService) => {
        return () => {
          return appConfigService.loadConfig();
        };
      }
    },
    PreferenciasRepository,
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [PreferenciasRepository],
      useFactory: (appConfigService: PreferenciasRepository) => {
        return () => {
          return appConfigService.loadAppPreferences();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
