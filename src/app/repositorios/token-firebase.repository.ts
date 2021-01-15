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
import { TokenFirebase } from '../dominio/token-firebase';

@Injectable({
  providedIn: 'root',
})
export class TokenFirebaseRepository {
  constructor(
    private configService: ConfigService,
    private headerService: HeadersService
  ) {}

  private url = this.configService.baseURL + '/tokenFirebase';

  public save(tokenFirebase: TokenFirebase): Observable<TokenFirebase> {
    return this.headerService.post<TokenFirebase>(
      this.url,
      tokenFirebase
    );
  }
}
