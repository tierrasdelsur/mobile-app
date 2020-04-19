import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-obtener-telefono',
  templateUrl: './obtener-telefono.component.html',
  styleUrls: ['./obtener-telefono.component.css']
})
export class ObtenerTelefonoComponent implements OnInit, OnDestroy {

  private diccionarioSubs: { [key: string]: Subscription } = {};


  constructor() { }

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

}
