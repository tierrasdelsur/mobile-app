import { SesionRepository } from './../repositorios/sesion.repository';
import { HeadersService } from './headers.service';
import { Injectable } from '@angular/core';
import { TwoFactorRepository } from '../repositorios/two-factor.repositoy';
import { Observable, of, interval } from 'rxjs';
import { TwoFactor } from '../dominio/two-factor';
import { map, flatMap } from 'rxjs/operators';
import { authenticator } from 'otplib/otplib-browser';
import { Sesion } from '../dominio/sesion';

@Injectable({
  providedIn: 'root',
})
export class TwoFactorService {
  constructor(
    private twoFactorRepository: TwoFactorRepository,
    private headersService: HeadersService,
    private sesionRepository: SesionRepository,
    ) {}

  private twoFactor: TwoFactor;

  

  public get(): Observable<TwoFactor> {
    if (this.twoFactor) {
      return of(this.twoFactor);
    } else {
      return this.twoFactorRepository.get().pipe(
        map((tf: TwoFactor) => {
          this.sesionRepository.setTotpCodigo(tf.codigo);
          this.twoFactor = tf;
          return tf;
        }), flatMap((tf: TwoFactor) => {
          return this.sesionRepository.getSesion().pipe(map((sesion: Sesion) => {
            sesion.usuario.twoFactor = true
            this.sesionRepository.saveSesion(sesion)
            return tf;
          }))
        })
      )
    }
  }

  public getConCodigo(codigo: string): Observable<TwoFactor> {
    return this.twoFactorRepository.getConCodigo(codigo).pipe(
      map((tf: TwoFactor) => {
        this.sesionRepository.setTotpCodigo(tf.codigo);
        this.twoFactor = tf;
        return tf;
      })
    );
  }

  public getCodigo(): Observable<TokenInfo> {
    return interval (1 * 1000).pipe(
      flatMap(() => {
        return this.get().pipe(
          map((tf: TwoFactor) => {
            const codigo = authenticator.generate(tf.codigo);
            // codigo + " - " + authenticator.timeRemaining() + " - " +authenticator.timeUsed();
            return {codigo: codigo, tiempoRestante: authenticator.timeRemaining()}
          })
        );
      })
    );
  }
}

export class TokenInfo {
  tiempoRestante: number
  codigo: string
}
