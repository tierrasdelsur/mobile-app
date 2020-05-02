import { AppError } from './../errores/apperrror';
import { UnAuthentificatedError } from './../errores/unauthentificatederror';
import { SesionRepository } from './../repositorios/sesion.repository';
import { Router, ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { TypeSnackBar } from '../enums/typesnackbar';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorServidor } from '../dominio/error';

@Injectable({
  providedIn: 'root',
})
export class ErrorhandlerService {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private sesionRepository: SesionRepository
    ) {}


  public handle(error: Error) {
    console.error(error);
    if (error instanceof UnAuthentificatedError) {
      this.showUnAuthentificatedError();
    } else if (error instanceof AppError) {
      this.mostrarError(error.message, {
        duration: 5000,
        panelClass: error.typeMessage,
      });
    } else if (error instanceof HttpErrorResponse) {
      const errorMensaje = error.error['message'];
      if (error.status >= 500) {
        this.showServerError();
      }
      else if (error.status === 400) {
        this.showBadRequest(errorMensaje);
      }
      else if (error.status === 401) {
        this.showUnauthorized(errorMensaje);
      }
      else if (error.status === 403) {
        this.showForbidden(errorMensaje);
      }
      else if (error.status === 404) {
        this.showNotFound(errorMensaje);
      } else {
        this.showUnknowError();
      }
    } else {
      this.showUnknowError();
    }
  }

  private showServerError() {
    this.mostrarError('Ocurrio un error en el servidor, Intente nuevamente luego', {
      duration: 5000,
      panelClass: TypeSnackBar.ERROR,
    });
  }

  private showBadRequest(mensaje = 'Solicitud malformada') {
    this.mostrarError(mensaje , {
      duration: 5000,
      panelClass: TypeSnackBar.PRIMARY,
    });
  }

  private showUnauthorized(mensaje = 'No tienes permiso para acceder') {
    this.mostrarError(mensaje , {
      duration: 5000,
      panelClass: TypeSnackBar.PRIMARY,
    });
  }

  private showForbidden(mensaje = 'No tienes acceso a este recurso') {
    this.mostrarError(mensaje , {
      duration: 5000,
      panelClass: TypeSnackBar.ERROR,
    });
  }

  private showNotFound(mensaje = 'No se ha encontrado el recurso') {
    this.mostrarError(mensaje, {
      duration: 5000,
      panelClass: TypeSnackBar.ERROR,
    });
  }


  private showUnknowError() {
    this.mostrarError('Ocurrio un error inesperado', {
      duration: 5000,
      panelClass: TypeSnackBar.ERROR,
    });
  }

  private showUnAuthentificatedError() {
    const snack = this.mostrarError('Debes logearte nuevamente', {
      duration: 5000,
      panelClass: TypeSnackBar.ERROR,
    });

    snack.afterDismissed().subscribe({
      next: () => {
        this.sesionRepository.delete();
        this.router.navigate(['../login'], { relativeTo: this.route } );
      }
    });
  }

  private mostrarError(mensaje: string, style: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(mensaje, 'OK', style);
  }
}
