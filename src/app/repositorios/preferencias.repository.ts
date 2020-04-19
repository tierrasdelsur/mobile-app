import { Injectable } from '@angular/core';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PreferenciasRepository {

  private preferences: { [id: string]: any; } = {};

  constructor(
  ) { }

  loadAppPreferences() {
    const preferenciasObjeto = localStorage.getItem('preferencias') ? localStorage.getItem('preferencias') : '{}' ;
    return of(JSON.parse(preferenciasObjeto))
      .toPromise()
      .then(data => {
        this.preferences = data;
      });
  }

  set(key: string, value: any) {
    this.preferences[key] = value;
    this.savePreferencias();
  }

  get(key: string): any {
    return this.preferences[key];
  }

  clear(key: string) {
    delete this.preferences[key];
    this.savePreferencias();
  }

  clearAll() {
    this.preferences = {};
    this.savePreferencias();
  }

  savePreferencias() {
    localStorage.setItem('preferencias', JSON.stringify(this.preferences));
  }
}
