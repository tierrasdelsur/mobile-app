import { HeadersService } from './../servicios/headers.service';
import { Sesion } from './../dominio/sesion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../servicios/config.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { map, flatMap } from 'rxjs/operators';
import { UnAuthentificatedError } from '../errores/unauthentificatederror';
import { Codigo } from '../dominio/codigo';
import { SesionRepository } from './sesion.repository';
import { DetalleValidacion } from '../dominio/detalle-validacion';

@Injectable({
  providedIn: 'root',
})
export class TelefonoRepository {
  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private headerService: HeadersService
  ) {}

  private url = this.configService.baseURL + '/sms';

  public setTelefono(telefono: string): Observable<DetalleValidacion> {
    return this.headerService.post<DetalleValidacion>(
      this.url,
      { telefono }
    );
  }

  public validarTelefono(
    telefono: string,
    codigo: string
  ): Observable<Usuario> {
    return this.headerService.post<Usuario>(this.url + '/validar', { telefono, codigo } )
  }
}
