import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router
  ) {}
  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return of(false);
    }
    return of(true);
  }
}
