import { Component, OnInit, ViewChild } from '@angular/core';
import { PageService, AuthorizationService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as slug from '../../../_slug';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class faqComponent implements OnInit {
  @ViewChild('ourKeyModal') public ourKeyModal: ModalDirective;

  html: string;
  Form: FormGroup;
  submitted = false;
  sections = [];
  slug = slug.slug.faq;
  faqSection = [
    {
      name: 'Candidates',
      key: 'candidates'
    },
    {
      name: 'Employers',
      key: 'employers'
    },
    {
      name: 'Partners',
      key: 'partners'
    }
  ]
  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'Lora', name: 'Lora'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    toolbarHiddenButtons: [
      [
        'insertImage',
        'insertVideo',
        'removeFormat'
      ]
    ]
  };

  constructor(private formBuilder: FormBuilder, private service: PageService, private route: ActivatedRoute,
    private auth: AuthorizationService,
    private toastr: ToastrService) { }

  isNumber(input) {
    return Number(input.value) ? null : { NotanNumber: true };
  }
  ngOnInit(): void {
    const form: any = {
      hr_per_unit_jc: ['', Validators.required],
      hr_per_unit_rv: ['', Validators.required],
    };

    this.Form = this.formBuilder.group(form);
    this.route.data.subscribe((response) => {
      if (response.page.data && response.page.data.html) {
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

  submit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.Form.invalid) {
      return;
    }
    // this.service.updateExtra(slug.slug.home, { extras: this.Form.value }).subscribe((data: any[]) => {
    //   this.ourKeyModal.hide();
    //   this.toastr.success('Updated Successfully', 'Success');
    // }, error => {
    // });
  }

}
