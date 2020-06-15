import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'profile'
    },
    children: [
      {
        path: '',
        redirectTo: 'view'
      },
      {
        path: 'view',
        component: ViewComponent,
        data: {
          title: 'View',
          module: 'profile',
        }
      },
    //   {
    //     path: 'add',
    //     component: EditComponent,
    //     data: {
    //       title: 'Add',
    //       module: 'roles',
    //       permission: ['add']
    //     }
    //   },
    //   {
    //     path: 'edit/:id',
    //     component: EditComponent,
    //     data: {
    //       title: 'Edit',
    //       module: 'roles',
    //       permission: ['update']
    //     },
    //   }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
