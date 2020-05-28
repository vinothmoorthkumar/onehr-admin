import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
    constructor(
        private router: Router,
        private auth: AuthService,
        private activeroute: ActivatedRoute
    ) { }
    helper = new JwtHelperService();
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.auth.currentUserValue;
        const decodedToken = this.helper.decodeToken(currentUser.token);
        if (decodedToken.superadmin) {
            return true;
        }

        if (route.data && route.data.permission && route.data.module) {
            let getModule = decodedToken.permission.find(ele => {
                return ele.module == route.data.module;
            });
            return route.data.permission.every(ele => {
                return getModule.permission.includes(ele);
            })
        } else {
            return true;
        }


        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/login']);
        // return false;
    }
}
