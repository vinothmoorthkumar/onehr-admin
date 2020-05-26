import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'role'
    },
    children: [
        {
          path: '',
          redirectTo: 'list'
        },
        {
          path: 'list',
          component: ListComponent,
          data: {
            title: 'List'
          }
        },
        {
            path: 'add',
            component: EditComponent,
            data: {
              title: 'Add'
            }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule {}
