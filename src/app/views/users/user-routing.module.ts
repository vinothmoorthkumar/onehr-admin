import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { UserResolverService } from './edit/edit.resolve'
import { AuthorizationGuard } from '../../helpers';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'user'
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
          module: 'users',
          permission: ['view']
        }
      },
      {
        path: 'add',
        component: EditComponent,
        canActivate: [AuthorizationGuard],
        data: {
          title: 'Add',
          module: 'users',
          permission: ['add']
        }
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [AuthorizationGuard],
        data: {
          title: 'Edit',
          module: 'users',
          permission: ['update']
        },
        resolve: { user: UserResolverService }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
