import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OurServiceJobClassComponent } from './our-services-job-classification/our-services-job-classification.component';

import { PagesResolverService } from './pages.resolve';
import { pageAuthGuard } from '../../helpers';
import * as slug from '../../_slug';
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
          slug: slug.slug.home,
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
          slug: slug.slug.aboutus,
          access: 'view'
        },
        canActivate: [pageAuthGuard],
        resolve: { page: PagesResolverService }
      },
      {
        path: 'our-services-job-classification',
        component: OurServiceJobClassComponent,
        data: {
          title: 'Job Classification',
          slug: slug.slug.job_classification,
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
export class PagesRoutingModule { }