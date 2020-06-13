import { Sesion } from './../dominio/sesion';
import { TwoFactorService } from './two-factor.service';
import { SesionRepository } from './../repositorios/sesion.repository';
import { Observable, zip, forkJoin } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, take, flatMap } from 'rxjs/operators';
import { authenticator } from 'otplib/otplib-browser';

@Injectable({
  providedIn: 'root',
})
export class HeadersService {
  constructor(
    private httpClient: HttpClient,
    private sesionRepository: SesionRepository
  ) {}

  private getHeaders() {
    return this.sesionRepository.getSesion().pipe(
      map((sesion: Sesion) => {
        if (this.sesionRepository.getTotpCodigo()) {
          return new HttpHeaders({ Authorization: `Bearer ${sesion.token}` ,
           Totp: this.generarCodigoTemporal(this.sesionRepository.getTotpCodigo())});
        } else {
          return new HttpHeaders({ Authorization: `Bearer ${sesion.token}` });
        }
      })
    );
  }

  get<T>(url: string): Observable<T> {
    return this.getHeaders().pipe(
      flatMap((headers) => {
        return this.httpClient.get<T>(url, { headers });
      })
    );
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.getHeaders().pipe(
      flatMap((headers) => {
        return this.httpClient.post<T>(url, body, { headers });
      })
    );
  }

  private generarCodigoTemporal(codigo: string) {
    return authenticator.generate(codigo);
    // return "eee";
  }
}
