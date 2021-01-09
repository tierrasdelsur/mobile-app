import { Usuario } from 'src/app/dominio/usuario';
import { SesionRepository } from './../../../repositorios/sesion.repository';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of, onErrorResumeNext } from 'rxjs';
import { ConfigService } from 'src/app/servicios/config.service';

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private sesionRepository: SesionRepository,
    private configService: ConfigService
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.usuarioService.get().pipe(
      map((usuario: Usuario) => {
        if (route.queryParams.activar) {
          return true;
        }

        if (usuario.telefono == undefined && this.configService.pedirTelefono) {
          this.router.navigate(['./telefono']);
          return false;
        }

        if (usuario.twoFactor) {
          if (this.sesionRepository.getTotpCodigo()) {
            return true;
          } else {
            this.router.navigate(['./factor/reactivar']);
            return false;
          }
        } else {
          this.router.navigate(['./factor/activar']);
          return false;
        }
      })
    );
  }
}
