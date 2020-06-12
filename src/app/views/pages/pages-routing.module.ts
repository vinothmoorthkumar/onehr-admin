import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {PagesResolverService} from './pages.resolve';
import { pageAuthGuard } from '../../helpers';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pages',
      module: 'pages',
      permission: ['view']
    },
    children: [
      {
        path: '',
        redirectTo: 'home',
        canActivate: [pageAuthGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home',
          slug: 'home',
          access: 'view'
        },
        canActivate: [pageAuthGuard],
        resolve: { page: PagesResolverService }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About',
          slug: 'about_us',
          access: 'view'
        },
        canActivate: [pageAuthGuard],
        resolve: { page: PagesResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}