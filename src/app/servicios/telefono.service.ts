import { DetalleValidacion } from './../dominio/detalle-validacion';
import { UsuarioService } from './usuario.service';
import { SesionRepository } from './../repositorios/sesion.repository';
import { PreferenciasRepository } from './../repositorios/preferencias.repository';
import { Sesion } from './../dominio/sesion';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigService } from './../servicios/config.service';
import { Injectable } from '@angular/core';
import { Usuario } from '../dominio/usuario';
import { map, flatMap } from 'rxjs/operators';
import { UnAuthentificatedError } from '../errores/unauthentificatederror';
import { AppError } from '../errores/apperrror';
import { TelefonoRepository } from '../repositorios/telefono.repository';


@Injectable({
  providedIn: 'root'
})
export class TelefonoService {

  private static omitirTelefono = false;

  constructor(
    private preferenciasRepository: PreferenciasRepository,
    private telefonoRepository: TelefonoRepository,
    private usuarioService: UsuarioService
  ) { }

  public omitir() {
    TelefonoService.omitirTelefono = true;
  }

  public isOmitido(): boolean {
    return TelefonoService.omitirTelefono;
  }

  public getUltimoTelefono(): string{
    return this.preferenciasRepository.get('telefono');
  }

  public setTelefono(telefono: string): Observable<DetalleValidacion> {
    return this.telefonoRepository.setTelefono(telefono);
  }

  public validarTelefono(telefono: string, codigo: string): Observable<Usuario> {
    return this.telefonoRepository.validarTelefono(telefono, codigo).pipe(
      map((usuario: Usuario) => {
        this.usuarioService.set(usuario);
        return usuario;
      })
    );
  }


}
