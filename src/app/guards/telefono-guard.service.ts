import { ConfigService } from './../servicios/config.service';
import { LoginComponent } from './../modulos/login/componentes/login/login.component';
import { Sesion } from './../dominio/sesion';
import { SesionRepository } from './../repositorios/sesion.repository';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanDeactivate,
  ActivatedRoute,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class TelefonoGuard implements CanActivate {
  constructor(
    private router: Router,
    private sesionRepository: SesionRepository,
    private configService: ConfigService,
    private route: ActivatedRoute
  ) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(this.configService.pedirTelefono).pipe(
      flatMap((isPedirTelefono) => {
        if (isPedirTelefono) {
          return this.sesionRepository.getSesion().pipe(
            map((sesion: Sesion) => {
              if (sesion.usuario.telefono) {
                return true;
              } else {
                this.router.navigate(['telefono'], { relativeTo: this.route });
                return false;
              }
            })
          );
        } else {
          return of(true);
        }
      })
    );
  }
}
