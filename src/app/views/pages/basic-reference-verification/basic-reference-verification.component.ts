import { Component, OnInit, ViewChild } from '@angular/core';
import { PageService, AuthorizationService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as slug from '../../../_slug';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-basic-reference',
  templateUrl: './basic-reference-verification.component.html',
  styleUrls: ['./basic-reference-verification.component.css']
})
export class BasicReferenceComponent implements OnInit {
  @ViewChild('ourKeyModal') public ourKeyModal: ModalDirective;

  html: string;
  submitted = false;
  sections = [];
  slug= slug.slug.basic_reference_verification;

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

  constructor( private service: PageService, private route: ActivatedRoute,
    private auth: AuthorizationService,
    private toastr: ToastrService) { }

  isNumber(input) {
    return Number(input.value) ? null : { NotanNumber: true };
  }
  ngOnInit(): void {

    this.route.data.subscribe((response) => {
      if(response.page.data && response.page.data.html){
        this.sections = response.page.data.html;
      }
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

  Isauth(access) {
    return this.auth.IsPageAuth(this.slug, access);
  }

  addsec() {
    this.sections.push({
      name: 'new section',
      html: '<h1> New section</h1>'
    })
  }

  deletesec(index) {
    this.sections.splice(index, 1);
  }

  publish() {
    let obj = { name: this.slug, html: this.sections };
    let checkForm = this.sections.find(ele => {
      return ele.name == "" || ele.html == ""
    })
    if (!checkForm) {
      this.service.update(this.slug, obj).subscribe((response: any) => {
        this.toastr.success('Updated Successfully', 'Success');
      });
    } else {
      this.toastr.error('Name and content is mandatory', 'Error');
    }
  }


}
