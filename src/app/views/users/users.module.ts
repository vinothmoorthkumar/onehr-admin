import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { UsersRoutingModule } from './user-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatPaginatorModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EditComponent, ListComponent]
})
export class UsersModule { }
