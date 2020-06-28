import { Router, ActivatedRoute } from '@angular/router';
import { SesionRepository } from './../../../repositorios/sesion.repository';
import { ErrorhandlerService } from 'src/app/servicios/errorhandler.service';
import { TwoFactorService } from './../../../servicios/two-factor.service';
import { TwoFactor } from './../../../dominio/two-factor';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

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

  public qrdata: string = null;
  public elementType: 'img' | 'url' | 'canvas' | 'svg' = null;
  public level: 'L' | 'M' | 'Q' | 'H';
  public width: number;

  constructor(
    private twoFactorService: TwoFactorService,
    private errorHandlerService: ErrorhandlerService,
    private sesionRepository: SesionRepository,
    private router: Router,
    private route: ActivatedRoute
  ) {

    this.elementType = 'img';
    this.level = 'M';
    this.qrdata = 'Initial QR code data string';
    this.scale = 1;
    this.width = 256;
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

  back() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }

  ngOnInit() {
    this.cargando = true;
    this.diccionarioSubs.get = this.twoFactorService.get().subscribe({
      next: (tf: TwoFactor) => {
        this.twoFactor = tf;
        this.cargando = false;
        this.qrdata = `otpauth://totp/${this.twoFactor.app}:${this.twoFactor.cuenta}?secret=${this.twoFactor.codigo}&issuer=${this.twoFactor.app}`;
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
    this.diccionarioSubs.getCodigo = this.twoFactorService.getCodigo()
    .pipe(map((codigo) => {
      const midLength = (codigo.length / 2);
      return `${codigo.substring(0, midLength)} ${codigo.substring(midLength, codigo.length)}`;
    }))
    .subscribe({
      next: (codigo: string) => {
        this.codigo = codigo;
      },
      error: (error) => {
        this.errorHandlerService.handle(error);
      },
    });
  }

}
