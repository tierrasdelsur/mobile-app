import { Sesion } from '../../../dominio/sesion';
import { SesionRepository } from '../../../repositorios/sesion.repository';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/dominio/usuario';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {
  public usuario: Usuario;

  public diccionarioSubs: { [key: string]: Subscription } = {};

  constructor(
    private snackBar: MatSnackBar,
    private sesionRepository: SesionRepository
    ) {}

  ngOnDestroy(): void {
    for (const key in this.diccionarioSubs) {
      if (this.diccionarioSubs.hasOwnProperty(key)) {
        if (this.diccionarioSubs[key]) {
          this.diccionarioSubs[key].unsubscribe();
        }
      }
    }
  }

  ngOnInit(): void {
    this.diccionarioSubs.getSesion = this.sesionRepository
      .getSesion()
      .subscribe({
        next: (sesion: Sesion) => {
          this.usuario = sesion.usuario;
        },
        error: (error) => {
          this.mostrarError('Ocurrio un error en la app');
        },
      });
  }

  private mostrarError(mensaje: string, style = undefined) {
    const settings = {
      duration: 10000
    };
    if (style) { settings['panelClass'] = [style]; }
    this.snackBar.open(mensaje, 'OK', settings);
  }
}
