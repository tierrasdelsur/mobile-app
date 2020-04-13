import { ErrorServidor } from './../../dominio/error';
import { SesionRepository } from './../../repositorios/sesion.repository';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/dominio/usuario';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar
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
    this.sesionSubscription = this.sesionRepository.login(usuario).subscribe({
      next: () => {},
      error: (errorResponse: HttpErrorResponse) => {
        console.error(errorResponse);
        this.mostrarError((errorResponse.error as ErrorServidor).mensaje);
      }
    });
  }

  private mostrarError(mensaje: string) {
    this.snackBar.open(mensaje, 'OK', {
      duration: 10000,
    });
  }
}
