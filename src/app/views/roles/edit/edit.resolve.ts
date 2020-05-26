import { Injectable } from '@angular/core';
import { RolesService } from '../../../services';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class RoleResolverService implements Resolve<any> {
  constructor(private apiService: RolesService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getByid(route.params.id);
  }
}