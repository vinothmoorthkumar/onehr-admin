// Angular
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { HomeComponent } from './home/home.component';

// Components Routing
import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule,
    AngularEditorModule 
  ],
  declarations: [
    HomeComponent,
    AboutComponent
  ]
})
export class PagesModule { }