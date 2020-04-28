import { Sesion } from './../dominio/sesion';
import { SesionRepository } from './../repositorios/sesion.repository';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'src/app/dominio/config';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Usuario } from '../dominio/usuario';
import { flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  public _usuario: BehaviorSubject<Usuario> = new BehaviorSubject<Usuario>(undefined);

  constructor(
    private sesionRepository: SesionRepository
  ) {}

  set(usuario: Usuario) {
    this._usuario.next(usuario);
  }


  get(): Observable<Usuario> {
    return this._usuario.asObservable().pipe(flatMap((usuario: Usuario) => {
      if (!usuario) {
        return this.sesionRepository.getSesion().pipe( map((sesion: Sesion) => {
          return sesion.usuario;
        }));
      } else {
        throw of(usuario);
      }
    }));
  }
}
