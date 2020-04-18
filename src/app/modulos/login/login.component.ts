import { ErrorServidor } from './../../dominio/error';
import { SesionRepository } from './../../repositorios/sesion.repository';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/dominio/usuario';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public verPass = false;
  public formGroup: FormGroup;
  public cargando = false;

  private sesionSubscription: Subscription;

  @ViewChild('pass', { static: false }) pass: ElementRef;

  constructor(
    private sesionRepository: SesionRepository,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(){
    this.formGroup = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public verPassword() {
    this.verPass = !this.verPass;
    if (this.verPass) {
      this.pass.nativeElement.setAttribute('type', 'text');
    } else {
      this.pass.nativeElement.setAttribute('type', 'password');
    }
  }

  public login() {
    const usuario = Object.assign(new Usuario(), this.formGroup.value);
    this.cargando = true;
    this.sesionSubscription = this.sesionRepository.login(usuario).subscribe({
      next: () => {
        this.router.navigate(['/'], {
          relativeTo: this.route
        }).then(() => {
          this.cargando = false;
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        this.cargando = false;
        console.error(errorResponse);
        if (errorResponse.status === 401 && (errorResponse.error as ErrorServidor).mensaje) {
          this.mostrarError((errorResponse.error as ErrorServidor).mensaje);
        } else {
          this.mostrarError('Ocurrio un error, por favor intente nuevamente en unos minutos', 'errorMensaje');
        }
      }
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
