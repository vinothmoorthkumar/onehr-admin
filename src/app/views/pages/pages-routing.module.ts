import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { OurServiceJobClassComponent } from './our-services-job-classification/our-services-job-classification.component';
import { BasicReferenceComponent } from './basic-reference-verification/basic-reference-verification.component'
import { OrgDesignComponent } from './organizational-design/organizational-design.component'
import { faqComponent } from './faq/faq.component';

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
      },
      {
        path: 'basic-reference-verification',
        component: BasicReferenceComponent,
        data: {
          title: 'Basic Reference Verification',
          slug: slug.slug.basic_reference_verification,
          access: 'view'
        },
        canActivate: [pageAuthGuard],
        resolve: { page: PagesResolverService }
      },
      {
        path: 'organizational-design',
        component: OrgDesignComponent,
        data: {
          title: 'Organization Design',
          slug: slug.slug.organizational_design,
          access: 'view'
        },
        canActivate: [pageAuthGuard],
        resolve: { page: PagesResolverService }
      },
      {
        path: 'faq',
        component: faqComponent,
        data: {
          title: 'FAQ',
          slug: slug.slug.faq,
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