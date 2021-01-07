import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VersionService {

  private version = "{{ci-version}}";

  constructor() { }

  public getVersion(): String {
    return this.version;
  }

}
