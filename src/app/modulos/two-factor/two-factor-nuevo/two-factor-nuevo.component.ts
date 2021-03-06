import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TwoFactorRepository } from 'src/app/repositorios/two-factor.repositoy';
import { Subscription } from 'rxjs';
import { TwoFactorService } from 'src/app/servicios/two-factor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-two-factor-nuevo',
  templateUrl: './two-factor-nuevo.component.html',
  styleUrls: ['./two-factor-nuevo.component.scss']
})
export class TwoFactorNuevoComponent implements OnInit, OnDestroy  {

  public codigo = '';

  public diccionarioSubs: { [key: string]: Subscription } = {};


  constructor(
    private twoFactorService: TwoFactorService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
    this.router.navigate(['../../login'], {
      relativeTo: this.route
    });
  }


  validar() {
    this.diccionarioSubs.codigo = this.twoFactorService.getConCodigo(this.codigo).subscribe({
      next: () => {
        this.router.navigate(['../'], { relativeTo: this.route });
      },
      error: () => {
        this.snackBar.open('Codigo incorrecto', 'OK');
      }
    });
  }


}
