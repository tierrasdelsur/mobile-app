import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-two-factor-activar',
  templateUrl: './two-factor-activar.component.html',
  styleUrls: ['./two-factor-activar.component.css']
})
export class TwoFactorActivarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }


  public irA2Fac() {
    this.router.navigate(['../'], {
      relativeTo: this.route,
      queryParams: { activar : true },
      skipLocationChange: true
    });

  }
}
