import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RolesRoutingModule } from './roles-routing.module';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [ListComponent, EditComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    MatPaginatorModule
  ]
})
export class RolesModule { }
