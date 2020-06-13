import { SesionRepository } from './../../../repositorios/sesion.repository';
import { ErrorhandlerService } from 'src/app/servicios/errorhandler.service';
import { TwoFactorService } from './../../../servicios/two-factor.service';
import { TwoFactor } from './../../../dominio/two-factor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.css']
})
export class TwoFactorComponent implements OnInit, OnDestroy {

  public diccionarioSubs: { [key: string]: Subscription } = {};

  public cargando = false;

  public twoFactor: TwoFactor;

  public scale: number = 1;

  public codigo = '';

  constructor(
    private twoFactorService: TwoFactorService,
    private errorHandlerService: ErrorhandlerService,
    private sesionRepository: SesionRepository
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
    this.cargando = true;
    this.diccionarioSubs.get = this.twoFactorService.get().subscribe({
      next: (tf: TwoFactor) => {
        this.twoFactor = tf;
        this.cargando = false;
      },
      error: () => {
        this.cargando = false;
      }
    });

    this.getCodigo();
  }


  openAuth() {
    // tslint:disable-next-line: max-line-length
    window.open(`otpauth://totp/${this.twoFactor.app}:${this.twoFactor.cuenta}?secret=${this.twoFactor.codigo}&issuer=${this.twoFactor.app}`, '_blank');
  }

  getCodigo() {
    this.diccionarioSubs.getCodigo = this.twoFactorService.getCodigo().subscribe({
      next: (codigo: string) => {
        this.codigo = codigo;
      },
      error: (error) => {
        this.errorHandlerService.handle(error);
      },
    });
  }

}
