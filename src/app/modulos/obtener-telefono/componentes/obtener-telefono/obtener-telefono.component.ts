import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TelefonoService } from 'src/app/servicios/telefono.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-obtener-telefono',
  templateUrl: './obtener-telefono.component.html',
  styleUrls: ['./obtener-telefono.component.css']
})
export class ObtenerTelefonoComponent implements OnInit, OnDestroy {

  private diccionarioSubs: { [key: string]: Subscription } = {};

  public telefono = '';

  public codigo = '';

  public mostrarCodigo = false;

  public customPatterns = { 0: { pattern: new RegExp('^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$')} };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private telefonoService: TelefonoService,
    private snackBar: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    for (const key in this.diccionarioSubs) {
      if (this.diccionarioSubs.hasOwnProperty(key)) {
        if (this.diccionarioSubs[key]) {
          this.diccionarioSubs[key].unsubscribe();
        }
      }
    }
  }

  ngOnInit() {
  }


  public omitir() {
    this.telefonoService.omitir();
    this.router.navigate(['../'], { relativeTo: this.route, replaceUrl: true });
  }

  public validar() {
    if (!this.mostrarCodigo){
      this.validarTelefono();
    } else {
      this.validarCodigo();
    }
  }

  private validarCodigo() {
    this.diccionarioSubs.eeee = this.telefonoService.validarCodigo(this.codigo).subscribe({
      next: (isValid) => {
        if (isValid) {
          this.omitir();
        } else {
          this.mostrarError('El codigo es incorrecto');
        }
      },
      error: (error) => {
        this.mostrarError('Ocurrio un error al validar, intente nuevamente mas tarde', 'errorMensaje');
        console.error(error);
      }
    });
  }

  private validarTelefono() {
    if (this.telefono.match(/^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/) !== null) {
       console.log(this.telefono);
       this.mostrarCodigo = true;
    } else {
      this.mostrarError('El numero no es valido');
    }
  }

  private mostrarError(mensaje: string, style = undefined) {
    const settings = {
      duration: 10000
    };
    if (style) { settings['panelClass'] = [style]; }
    this.snackBar.open(mensaje, 'OK', settings);
  }
}
