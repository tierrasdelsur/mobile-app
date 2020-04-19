import { Sesion } from './../dominio/sesion';
import { SesionRepository } from './../repositorios/sesion.repository';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, onErrorResumeNext } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private sesionRepository: SesionRepository
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.sesionRepository.getSesion().pipe(
      map((sesion: Sesion) => {
        return true;
      }), catchError(() => {
        this.router.navigate(['/login'], { replaceUrl: true });
        return of(false);
      })
    );
  }
}
