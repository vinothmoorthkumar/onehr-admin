import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from '../../helpers';
import { MediaComponent } from './media.component';

const routes: Routes = [
  {
    path: '',
    component: MediaComponent,
    canActivate: [AuthorizationGuard],
    data: {
        title: 'Media',
        module: 'media',
        permission: ['view']
      }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
