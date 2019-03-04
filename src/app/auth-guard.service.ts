import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot) {
    
    let canAccessSectie = this.auth.sectii.find(el => {
      return el === route.paramMap.get('sectie')
    })
    const expectedLevel = route.data.expectedLevel

    // If user is not authenticated or does not have access route to login page
    if (!this.auth.isLoggedIn || !(canAccessSectie && expectedLevel <= this.auth.level)) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
