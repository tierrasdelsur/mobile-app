import { Sesion } from './../dominio/sesion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../servicios/config.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { map } from 'rxjs/operators';
import { UnAuthentificatedError } from '../errores/unauthentificatederror';


@Injectable({
  providedIn: 'root'
})
export class SesionRepository {

  constructor(
    private configService: ConfigService,
    private httpClient: HttpClient
  ) { }

  private url = this.configService.baseURL + '/sesion';


  public login(usuario: Usuario): Observable<Sesion> {
    const headers = new HttpHeaders({Authorization:  `Basic ${btoa(`${usuario.usuario}:${usuario.password}`)}`});

    return this.httpClient.get<Sesion>(this.url, { headers }).pipe(
      map((sesion: Sesion) => {
        this.saveSesion(sesion);
        return sesion;
      })
    );
  }

  private saveSesion(sesion: Sesion) {
    sessionStorage.setItem('sesion', JSON.stringify(sesion));
  }

  public delete() {
    sessionStorage.removeItem('sesion');
  }

  public getSesion(): Observable<Sesion> {
    return new Observable((subscriber) => {
      if (sessionStorage.getItem('sesion')) {
        subscriber.next(JSON.parse(sessionStorage.getItem('sesion')));
      } else {
        subscriber.error(new UnAuthentificatedError('Estas deslogeado de la app'));
      }
    });
  }

}
