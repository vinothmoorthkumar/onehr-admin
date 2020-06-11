import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MediaService, AuthorizationService } from '../../services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import  * as settings from './media.pages'
@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('uploadModal') public uploadModal: ModalDirective;
  @ViewChild('mediaModal') public mediaModal: ModalDirective;
  @Input() ngInit;
  Form: FormGroup;
  deleteItem;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: MediaService, private auth: AuthorizationService) { }
  mediaList: [];
  selectedFile: any;
  edit = false;
  editId;
  submitted = false;
  length = 0;
  pageSize = 5;
  sort = {
    col: 'name',
    order: true
  }
  selectedPage: any;
  selectedSection: any;
  search = '';
  progress = 0;
  fileSize = 'single';
  imageTypes = settings.settings.imageFormate;
  pages:any = settings.settings.pages;
  
  // [
  //   {
  //     name: 'Home',
  //     key: 'home',
  //     sections: [{
  //       name: "slider",
  //       key: "home_slider",
  //       allowFiles: this.imageTypes,
  //       extras: [{ key: 'title', name: 'Title' }, { key: 'subtitle', name: 'SubTitle' }, { key: 'link', name: 'Link' }, { key: 'button', name: 'Button Content' }]
  //     },
  //     {
  //       name: "Our Partners",
  //       key: "home_our_partners",
  //       file: "multiple",
  //       allowFiles: this.imageTypes,
  //       extras: [{ key: 'link', name: 'Link' }]
  //     },
  //     {
  //       name: "Testimonial",
  //       key: "home_testimonial",
  //       file: "multiple",
  //       allowFiles: this.imageTypes,
  //       extras: [{ key: 'feedback', name: 'Feedback' },{ key: 'name', name: 'Name' },{ key: 'designation', name: 'Designation' },{ key: 'department', name: 'Department' }]
  //     }]
  //   },
  //   {
  //     name: 'About Us',
  //     key: 'about_us',
  //     sections: [{
  //       name: "Our mandate",
  //       key: "aboutUs_our_mandate",
  //       file: "single",
  //       allowFiles: this.imageTypes
  //     },
  //     {
  //       name: "Our Partners",
  //       key: "aboutUs_our_partners",
  //       file: "multiple",
  //       allowFiles: this.imageTypes,
  //       extras: [{ key: 'link', name: 'Link' }]
  //     },
  //     {
  //       name: "Brochure",
  //       key: "aboutUs_Brochure",
  //       file: "single",
  //       allowFiles: ['application/pdf']
  //     }
  //     ]
  //   },
  //   {
  //     name: 'Job Classification',
  //     key: 'job-classification'
  //   }
  // ]
  viewMedia = "";
  pageEvent: PageEvent;

  ngOnInit(): void {
    const form: any = {
      name: ['', Validators.required],
      page: ['', Validators.required],
      section: ['', Validators.required],
      files: ['', Validators.required],
    };
    this.Form = this.formBuilder.group(form);

    this.fetchData();
  }

  Isauth(access) {
    return this.auth.IsAuth('media', access);
  }

  fetchData() {
    let index = 0
    if (this.pageEvent && this.pageEvent.pageIndex) {
      index = this.pageEvent.pageIndex * this.pageSize;
    }
    let obj = { skip: index, perPage: this.pageSize, sort: this.sort, search: this.search };
    this.service.get(obj).subscribe((response: any) => {
      if (response.data && response.data.result) {
        this.mediaList = response.data.result;
        this.length = response.data.total;
      }
    });
  }

  changeSection(sec) {
    console.log('changesection called')
    this.Form.removeControl('extras');
    this.fileSize = sec.file;
    this.selectedSection = sec;
    this.addExtrasInForm();
  }

  addExtrasInForm() {

    if (this.selectedSection && this.selectedSection.extras) {

      let obj = {};
      this.selectedSection.extras.forEach(ele => {
        obj[ele.key] = [''];
      });

      this.Form.addControl('extras', this.formBuilder.group(obj));
    }
  }

  changepage() {
    this.fetchData()
  }

  getPage(page, index) {
    let checkPage = this.pages.find(ele => ele.key == page);
    return checkPage.name;
  }

  getsection(page, section) {
    let checkPage = this.pages.find(ele => ele.key == page);
    return checkPage.sections.find(ele => ele.key == section);
  }

  delete() {
    this.service.delete(this.deleteItem).subscribe((data: any) => {
      this.myModal.hide()
      this.fetchData();
    });
  }

  setDeleteId(id) {
    this.deleteItem = id;
  }

  sortTable(type) {
    if (this.sort.col == type) {
      this.sort.order = !this.sort.order;
    }
    this.sort.col = type;
    this.fetchData();
  }

  setPage(page) {
    this.selectedPage = this.pages.find(ele => {
      return ele.key == page
    }).sections;
    if(this.Form.value && this.Form.value.section){
      this.Form.patchValue({section:''});
    }
    this.selectedSection = [];
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files;
    this.Form.patchValue({
      files: file
    });
    this.selectedFile = file;
    this.Form.get('files').updateValueAndValidity()
  }

  get f() { return this.Form.controls; }

  progressStatus(event) {
    switch (event.type) {
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:
        this.progress = Math.round(event.loaded / event.total * 100);
        console.log(`Uploaded! ${this.progress}%`);
        break;
      case HttpEventType.Response:
        console.log('created successfully !', event.body);
        this.closeUploadModal();
        this.fetchData();
        setTimeout(() => {
          this.progress = 0;
        }, 1500);
    }
    this.Form.reset(this.Form.value);
  }


  submit() {
    console.log('this.Form.value', this.Form.value)
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }
    let getSection = this.getsection(this.Form.value.page, this.Form.value.section);
    if (getSection && getSection.allowFiles && this.Form.value.files.length > 0) {
      if (!getSection.allowFiles.includes(this.Form.value.files[0].type)) {
        this.toastr.error(`Only following file types are allowed ${getSection.allowFiles}`, 'Error');
        return;
      }
    }

    if (this.edit) {
      this.service.update(this.editId, this.Form.value).subscribe((event: HttpEvent<any>) => {
        this.progressStatus(event);
      }, error => {
        this.progress = 0;
        this.toastr.error('Something went wrong, Check file type', 'Error');
      })
    } else {
      this.service.create(this.Form.value, this.fileSize).subscribe((event: HttpEvent<any>) => {
        this.progressStatus(event);
      }, error => {
        this.progress = 0;
        this.toastr.error('Something went wrong, Check file type', 'Error');
      })
    }

  }

  resetForm() {
    console.log('test reset')
    this.submitted = false;
    this.selectedFile = [];
    this.selectedSection='';
    this.Form.reset();
    this.Form.removeControl('extras');
    this.selectedPage = [];
  }
  closeUploadModal() {
    this.uploadModal.hide();
    this.resetForm();
  }
  setViewMedia(path) {
    this.mediaModal.show();
    this.viewMedia = path;
  }

  openUploadModel(id) {
    if (id) {
      this.edit = true;
      this.editId = id;
      this.Form.get('files').setValidators([]);
      this.service.getByid(id).subscribe((response: any) => {
        if (response.data && response.data) {
          let data = response.data;
          let obj = {
            name: data.name || '',
            page: data.page || '',
            section: data.section || '',
            files: '',
          }
          let currentSection = this.getsection(data.page, data.section);
          if (data.section != 'none') {
            this.changeSection(currentSection);
          }
          if (currentSection && currentSection.extras) {
            let extraObj = {}
            currentSection.extras.forEach(element => {
              extraObj[element.key] = data.extras && data.extras[element.key] ? data.extras[element.key] : '';
            });
            obj['extras'] = extraObj;

          }

          this.Form.setValue(obj);
          this.selectedFile = [{ name: data.fileOriginalName }]
          this.uploadModal.show()
        }
      });
    } else {
      this.resetForm();
      this.edit = false;
      this.uploadModal.show()
    }
  }

  copied(){
    this.toastr.success('File Path Copied Successfully');
  }
  
}
