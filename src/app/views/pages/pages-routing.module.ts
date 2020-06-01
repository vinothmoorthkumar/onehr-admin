import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import {PagesResolverService} from './pages.resolve';
const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        redirectTo: 'home'
      },
      {
        path: 'home',
        component: HomeComponent,
        data: {
          title: 'Home'
        }
      },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          title: 'About'
        },
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