import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { RoleResolverService } from './edit/edit.resolve';
import { AuthorizationGuard } from '../../helpers';

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
        canActivate: [AuthorizationGuard],
        data: {
          title: 'List',
          module: 'roles',
          permission: ['view']
        }
      },
      {
        path: 'add',
        component: EditComponent,
        canActivate: [AuthorizationGuard],
        data: {
          title: 'Add',
          module: 'roles',
          permission: ['add']
        }
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [AuthorizationGuard],
        data: {
          title: 'Edit',
          module: 'roles',
          permission: ['update']
        },
        resolve: { role: RoleResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
