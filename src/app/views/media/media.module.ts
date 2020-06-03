import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import {MediaRoutingModule} from './media-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';

@NgModule({
  declarations: [MediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot(),
    MatPaginatorModule,
    ReactiveFormsModule,
    MediaRoutingModule,
    ProgressbarModule.forRoot(),
  ]
})
export class MediaModule { }
