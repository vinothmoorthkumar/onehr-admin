import { Injectable } from '@angular/core';
import { PageService } from '../../services';

import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PagesResolverService implements Resolve<any> {
  constructor(private apiService: PageService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.apiService.get(route.data.slug);
  }
}