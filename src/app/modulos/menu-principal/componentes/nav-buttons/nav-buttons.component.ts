import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/dominio/usuario';
import { SesionRepository } from 'src/app/repositorios/sesion.repository';
import { ErrorhandlerService } from 'src/app/servicios/errorhandler.service';
import { NotificacionesService } from 'src/app/servicios/notificaciones.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { VersionService } from 'src/app/servicios/version.service';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent implements OnInit {

  public usuario: Usuario;
  public diccionarioSubs: { [key: string]: Subscription } = {};

  constructor(
    public versionService: VersionService,
    private router: Router,
    private usuarioService: UsuarioService,
    private errorhandlerService: ErrorhandlerService,
    private sesionRepository: SesionRepository,
    private notificacionesService: NotificacionesService
  ) { }

  ngOnInit() {
    this.getUsuario();
  }

  ngOnDestroy(): void {
    for (const key in this.diccionarioSubs) {
      if (this.diccionarioSubs.hasOwnProperty(key)) {
        if (this.diccionarioSubs[key]) {
          this.diccionarioSubs[key].unsubscribe();
        }
      }
    }
  }

  public goToToken() {
    this.router.navigate(['./factor']);
  }

  public logout() {
    this.sesionRepository.delete();
    this.notificacionesService.deleteToken();
    this.router.navigate(['./login'], { replaceUrl: true });
  }

  private getUsuario() {
    this.diccionarioSubs.getUsuario = this.usuarioService
      .get()
      .subscribe({
        next: (usuario: Usuario) => {
          this.usuario = usuario;
        },
        error: (error) => {
          this.errorhandlerService.handle(error);
        },
      });
  }

}
