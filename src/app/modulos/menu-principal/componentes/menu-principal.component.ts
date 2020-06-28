import { Router, ActivatedRoute } from '@angular/router';
import { UnAuthentificatedError } from './../../../errores/unauthentificatederror';
import { Codigo } from './../../../dominio/codigo';
import { Sesion } from '../../../dominio/sesion';
import { SesionRepository } from '../../../repositorios/sesion.repository';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from 'src/app/dominio/usuario';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CodigoRepository } from 'src/app/repositorios/codigo.repository';
import { ErrorhandlerService } from 'src/app/servicios/errorhandler.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss'],
})
export class MenuPrincipalComponent implements OnInit, OnDestroy {
  public usuario: Usuario;
  public codigoUsuario: Codigo;
  public diccionarioSubs: { [key: string]: Subscription } = {};

  constructor(
    private snackBar: MatSnackBar,
    private sesionRepository: SesionRepository,
    private usuarioService: UsuarioService,
    private codigoRepository: CodigoRepository,
    private errorhandlerService: ErrorhandlerService,
    private router: Router,
    private route: ActivatedRoute
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
    this.getUsuario();
    this.getCodigo();
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

  public goToToken() {
    this.router.navigate(['./factor']);
  }

  private getCodigo() {
    // this.diccionarioSubs.getCodigo = this.codigoRepository.get().subscribe({
    //  next: (codigo: Codigo) => {
    //    this.codigoUsuario = codigo;
    //  },
    //  error: (error) => {
    //   this.errorhandlerService.handle(error);
    //  }
    // });
  }
}
