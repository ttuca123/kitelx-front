import { Injectable } from '@angular/core';
import { CanActivateChild, RouterStateSnapshot, ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})

export class PermGuardService implements CanActivate {

  path: import('@angular/router').ActivatedRouteSnapshot[];
  route: import('@angular/router').ActivatedRouteSnapshot;
  dashboard = '/pagina-inicial';
  ADMIN = 'ROLE_ADMIN';

  constructor(public storage: StorageService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if(this.storage.getLocalUser() && this.storage.getLocalUser().perfil === 1) {
      return true;
    }

    this.router.navigate([this.dashboard]);
    return false;
  }

  

}
