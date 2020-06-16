// Angular
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { HomeComponent } from './home/home.component';

// Components Routing
import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { OurServiceJobClassComponent } from './our-services-job-classification/our-services-job-classification.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    AngularEditorModule,
    DragDropModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    AboutComponent,
    OurServiceJobClassComponent
  ]
})
export class PagesModule { }