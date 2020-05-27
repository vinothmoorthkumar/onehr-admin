import { Injectable } from '@angular/core';
import { UsersService } from '../../../services';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class UserResolverService implements Resolve<any> {
  constructor(private apiService: UsersService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.getByid(route.params.id);
  }
}