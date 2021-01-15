import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/analytics';

@Component({
  selector: 'app-two-factor-activar',
  templateUrl: './two-factor-activar.component.html',
  styleUrls: ['./two-factor-activar.component.scss']
})
export class TwoFactorActivarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private angularFireAnalytics: AngularFireAnalytics
  ) { }

  ngOnInit() {
  }


  public irA2Fac() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: { activar : true },
      skipLocationChange: true
    });
    this.angularFireAnalytics.logEvent('crear_token');

  }

  back() {
    this.angularFireAnalytics.logEvent('volver_crear_token');
    this.router.navigate(['../../'], {
      relativeTo: this.route
    });
  }
}
