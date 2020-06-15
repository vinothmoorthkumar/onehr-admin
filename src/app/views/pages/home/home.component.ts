import { Component, OnInit, ViewChild } from '@angular/core';
import { PageService, AuthorizationService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'underscore';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import * as slug from '../../../_slug';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('ourKeyModal') public ourKeyModal: ModalDirective;

  html: string;
  Form: FormGroup;
  submitted = false;
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

  constructor(private formBuilder: FormBuilder, private service: PageService, private route: ActivatedRoute,
    private auth: AuthorizationService,
    private toastr: ToastrService) { }

  isNumber(input) {
    return Number(input.value) ? null : { NotanNumber: true };
  }
  ngOnInit(): void {

    const form: any = {
      hr_per_unit_jc: ['', [Validators.required, this.isNumber]],
      hr_per_unit_rv: ['', [Validators.required, this.isNumber]],
      pc_pw: ['', [Validators.required, this.isNumber]],
      pc_pd: ['', [Validators.required, this.isNumber]],
      eav_jc: ['', [Validators.required, this.isNumber]],
      eav_rv: ['', [Validators.required, this.isNumber]],
    };
    this.Form = this.formBuilder.group(form);
    this.route.data.subscribe((response) => {
      this.sections = response.page.data.html;
      if (response.page.data && response.page.data.extras) {
        let data = response.page.data.extras;
        this.Form.setValue({
          hr_per_unit_jc: data.hr_per_unit_jc || '',
          hr_per_unit_rv: data.hr_per_unit_rv || '',
          pc_pw: data.pc_pw || '',
          pc_pd: data.pc_pd || '',
          eav_jc: data.eav_jc || '',
          eav_rv: data.eav_rv || '',
        });
      }

    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.sections, event.previousIndex, event.currentIndex);
  }
  get f() { return this.Form.controls; }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  Isauth(access) {
    return this.auth.IsPageAuth(slug.slug.home, access);
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
    let obj = { name: 'Home', html: this.sections };
    let checkForm = this.sections.find(ele => {
      return ele.name == "" || ele.html == ""
    })
    if (!checkForm) {
      this.service.update(slug.slug.home, obj).subscribe((response: any) => {
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
    this.service.updateExtra(slug.slug.home, { extras: this.Form.value }).subscribe((data: any[]) => {
      this.ourKeyModal.hide();
      this.toastr.success('Updated Successfully', 'Success');
    }, error => {
    });
  }

}
