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


@Injectable({
  providedIn: 'root'
})
export class CodigoRepository {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private headerService: HeadersService
  ) { }

  private url = this.configService.baseURL + '/codigo';


  public get(): Observable<Codigo> {
    return this.headerService.get<Codigo>(this.url);
  }

}
