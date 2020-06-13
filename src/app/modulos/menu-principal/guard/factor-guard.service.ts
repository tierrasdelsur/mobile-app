
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute
} from '@angular/router';
import { Observable, of, onErrorResumeNext } from 'rxjs';
import { SesionRepository } from 'src/app/repositorios/sesion.repository';
import { Sesion } from 'src/app/dominio/sesion';

@Injectable()
export class FactorGuard implements CanActivate {
  constructor(
    private router: Router,
    private sesionRepository: SesionRepository,
    private route: ActivatedRoute
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    return this.sesionRepository.getSesion().pipe(
      map((sesion: Sesion) => {
        if (sesion.usuario.twoFactor && !this.sesionRepository.getTotpCodigo()) {
          this.router.navigate(['/factor'], { relativeTo: this.route , skipLocationChange: true });
        } else {
          return true;
        }
        return true;
      }), catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
