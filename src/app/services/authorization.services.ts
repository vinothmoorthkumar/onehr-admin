import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
    constructor(
        private auth: AuthService,

    ) {
    }
    helper = new JwtHelperService();
    IsAuth(module, access) {
        const currentUser = this.auth.currentUserValue;
        const decodedToken = this.helper.decodeToken(currentUser.token);
        if (decodedToken.superadmin) {
            return true;
        } else {
            let getModule = decodedToken.permission.find(ele => {
                return ele.module == module;
            });
            if (getModule) {
                return getModule.permission.includes(access);
            }
            return false;
        }
    }

    IsPageAuth(slug, access) {
        const currentUser = this.auth.currentUserValue;
        const decodedToken = this.helper.decodeToken(currentUser.token);
        if (decodedToken.superadmin) {
            return true;
        } else {
            return decodedToken.pagePermission[access].includes(slug);
        }
    }

    IsSuperAdmin() {
        const currentUser = this.auth.currentUserValue;
        const decodedToken = this.helper.decodeToken(currentUser.token);
        if (decodedToken.superadmin) {
            return true;
        } else {
           return false;
        }
    }

}
