import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService, AuthorizationService } from '../../services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  @ViewChild('uploadModal') public uploadModal: ModalDirective;
  @ViewChild('mediaModal') public mediaModal: ModalDirective;
  Form: FormGroup;
  deleteItem
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: MediaService, private auth: AuthorizationService) { }
  mediaList: [];
  selectedFile: any;
  edit=false;
  editId;
  submitted = false;
  length = 0;
  pageSize = 5;
  sort = {
    col: 'name',
    order: true
  }
  selectedPage: any;
  search = '';
  progress = 0;
  fileSize = 'single';
  pages = [
    {
      name: 'Home',
      key: 'home',
      sections: [{
        name: "test1",
        key: "aboutUs_our_mandate"
      }, 
      {
        name: "test2",
        key: "aboutUs_our_partners"
      }]
    },
    {
      name: 'About Us',
      key: 'about-us',
      sections: [{
        name: "Our mandate",
        key: "aboutUs_our_mandate",
        file: "single"
      }, 
      {
        name: "Our Partners",
        key: "aboutUs_our_partners",
        file: "multiple"
      }]
    },
    {
      name: 'Job Classification',
      key: 'job-classification'
    }
  ]
  viewMedia= "";
  pageEvent: PageEvent;

  ngOnInit(): void {
    const form: any = {
      name: ['', Validators.required],
      page: ['', Validators.required],
      section: ['', Validators.required],
      link: [''],
      files: ['', Validators.required]
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

  changeSection(sec){
    this.fileSize=sec.file;
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
    return checkPage.sections.find(ele => ele.key == section).name;
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

  submit() {
    this.submitted = true;
    if (this.Form.invalid) {
      return;
    }

    if(this.edit){
      this.service.update(this.editId,this.Form.value).subscribe((event: HttpEvent<any>) => {
        console.log('test',event)
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
      }, error => {
        this.progress = 0;
        this.toastr.error('Something went wrong, Check file type', 'Error');
      })
    }else{
      this.service.create(this.Form.value, this.fileSize).subscribe((event: HttpEvent<any>) => {
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
      }, error => {
        this.progress = 0;
        this.toastr.error('Something went wrong, Check file type', 'Error');
      })
    }
   
  }

  resetForm() {
    this.submitted = false;
    this.selectedFile = [];
    this.Form.reset();
    this.selectedPage = [];
  }
  closeUploadModal() {
    this.uploadModal.hide();
    this.resetForm();
  }
  setViewMedia(path){
    this.mediaModal.show();
    this.viewMedia = path;
  }

  openUploadModel(id){
    if(id){
      this.edit=true;
      this.editId=id;
      this.Form.get('files').setValidators([]);
      this.service.getByid(id).subscribe((response: any) => {
        if (response.data && response.data) {

          let data =response.data;
          this.Form.setValue({
            name: data.name || '',
            page: data.page || '',
            section: data.section || '',
            link: data.link || '',
            files: '',
          });
          this.selectedFile=[{name:data.fileOriginalName}]
          this.uploadModal.show()
        }
      });
    }else{
      this.edit=false;
      this.uploadModal.show()
    }
  }
}
