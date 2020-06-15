import { Component, OnInit } from '@angular/core';
import { PageService, AuthorizationService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as slug from '../../../_slug';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  html: string;
  sections = [];
  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'removeFormat'
      ]
    ]
  };
  constructor(private service: PageService, private route: ActivatedRoute, 
    private auth: AuthorizationService,
    private toastr: ToastrService) { }
  ngOnInit(): void {
    this.route.data.subscribe((response) => {
      this.sections = response.page.data.html;
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  Isauth(access){
    return this.auth.IsPageAuth(slug.slug.home,access);
  }

  addsec(){
    this.sections.push({
      name:'new section',
      html:'<h1> New section</h1>'
    })
  }

  deletesec(index){
    this.sections.splice(index, 1);
  }

  publish() {
    let obj = { name: 'Home', html: this.sections };
    let checkForm=this.sections.find(ele=>{
      return ele.name=="" || ele.html==""
    })
    if(!checkForm){
      this.service.update(slug.slug.home, obj).subscribe((response: any) => {
        this.toastr.success('Updated Successfully', 'Success');
      });
    }else{
      this.toastr.error('Name and content is mandatory', 'Error');
    }
   
  }

}
