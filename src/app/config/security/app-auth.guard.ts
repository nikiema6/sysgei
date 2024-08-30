import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class AppAuthGuard extends KeycloakAuthGuard {
  constructor(protected router: Router,
              protected keycloakAngular: KeycloakService) {
    super(router, keycloakAngular);
  }

  isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      if (!this.authenticated) {
        this.keycloakAngular.login()
          .catch(e => console.error(e));
        reject(false);
      }

      const requiredRoles: string[] = route.data.roles;
      if (!requiredRoles || requiredRoles.length === 0) {
        resolve(true);
      } else {
        const checkAllRoles = route.data.checkAllRoles;
        if (!this.roles || this.roles.length === 0) {
          resolve(this.router.parseUrl('accessdenied'));
        }

        let result;
        if (checkAllRoles) {
          result = requiredRoles.every(role => this.roles.indexOf(role) > -1);
        } else {
          result = requiredRoles.some(role => this.roles.indexOf(role) > -1);
        }

        if (result) {
          resolve(true);
        } else {
          resolve(this.router.parseUrl('accessdenied'));
        }
      }
    });
  }
}
