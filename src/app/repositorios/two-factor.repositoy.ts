import { Sesion } from './../dominio/sesion';
import { TwoFactor } from './../dominio/two-factor';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../servicios/config.service';
import { Injectable } from '@angular/core';
import { map, flatMap } from 'rxjs/operators';
import { HeadersService } from '../servicios/headers.service';
import { SesionRepository } from './sesion.repository';


@Injectable({
  providedIn: 'root'
})
export class TwoFactorRepository {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient,
    private headersService: HeadersService,
    private sesionRepository: SesionRepository
  ) { }

  private url = this.configService.baseURL + '/factor';


  public get(): Observable<TwoFactor> {
    return this.headersService.get<TwoFactor>(this.url);
  }


  public getConCodigo(codigo: string): Observable<TwoFactor> {
    return this.sesionRepository.getSesion().pipe(
      flatMap((sesion: Sesion) => {
        const headers =  new HttpHeaders({ Authorization: `Bearer ${sesion.token}`, Totp: codigo });
        return this.httpClient.get<TwoFactor>(this.url, { headers });
      })
    );
  }

}
