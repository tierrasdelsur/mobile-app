import { SesionRepository } from './../repositorios/sesion.repository';
import { PreferenciasRepository } from './../repositorios/preferencias.repository';
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
export class TelefonoService {

  private static omitirTelefono = false;

  private codigo = '81019';

  constructor(
    private configService: ConfigService,
    private preferenciasRepository: PreferenciasRepository,
    private sesionRepository: SesionRepository
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

  public validarTelefono(telefono: string): Observable<string> {
    this.preferenciasRepository.set('telefono', telefono);
    return of(this.codigo);
  }

  public validarCodigo(codigo: string): Observable<boolean> {
    return of(codigo === this.codigo );
  }


}
