// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { HomeComponent } from './home/home.component';

// Components Routing
import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    AngularEditorModule,
    DragDropModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ]
})
export class PagesModule { }