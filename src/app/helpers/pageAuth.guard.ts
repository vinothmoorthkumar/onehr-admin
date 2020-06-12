import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from '../services';

@Injectable({ providedIn: 'root' })
export class pageAuthGuard implements CanActivate {
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
        }else{
            return decodedToken.pagePermission[route.data.access].includes(route.data.slug);
        }
    }
}
