import { Component, OnInit, ViewChild } from '@angular/core';
import { MediaService, AuthorizationService } from '../../services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  Form: FormGroup;
  deleteItem
  constructor(private formBuilder: FormBuilder,
    private service: MediaService, private auth: AuthorizationService) { }
  mediaList: [];
  selectedFile:any;
  submitted=false;
  length = 0;
  pageSize = 10;
  sort = {
    col: 'name',
    order: true
  }
  selectedPage:any;
  search = '';
  progress=0;
  pages = [
    {
      name: 'Home',
      key: 'home',
      sections: [{
        name: "test1",
        key: "aboutUs_our_mandate"
        }
        ,{
        name: "test2",
        key: "aboutUs_our_partners"
      }]
    },
    {
      name: 'About Us',
      key: 'about-us',
      sections: [{
        name: "Our mandate",
        key: "aboutUs_our_mandate"
        }
        ,{
        name: "Our Partners",
        key: "aboutUs_our_partners"
      }]
    },
    {
      name: 'Job Classification',
      key: 'job-classification'
    }
  ]

  pageEvent: PageEvent;

  ngOnInit(): void {
    const form: any = {
      name: ['', Validators.required],
      page: ['', Validators.required],
      section: ['', Validators.required],
      link: [''],
      files: ['',Validators.required]
    };
    this.Form = this.formBuilder.group(form);

    this.fetchData();
  }

  Isauth(access) {
    return this.auth.IsAuth('media', access);
  }

  fetchData() {
    // let index = 0
    // if (this.pageEvent && this.pageEvent.pageIndex) {
    //   index = this.pageEvent.pageIndex * this.pageSize;
    // }
    // let obj = { skip: index, perPage: this.pageSize, sort: this.sort, search: this.search };
    // this.service.get(obj).subscribe((response: any) => {
    //   if (response.data && response.data.result) {
    //     this.mediaList = response.data.result;
    //     this.length = response.data.total;
    //   }
    // });
  }

  changepage() {
    this.fetchData()
  }

  delete() {
    // this.service.delete(this.deleteItem).subscribe((data: any) => {
    //   this.myModal.hide()
    //   this.fetchData();
    // });
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
    this.selectedPage = this.pages.find(ele=>{
      return ele.key==page
    }).sections;
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files;
    this.Form.patchValue({
      files: file
    });
    this.selectedFile=file;
    console.log('test',this.selectedFile)
    this.Form.get('files').updateValueAndValidity()
  }

  get f() { return this.Form.controls; }

  submit(){
    this.submitted=true;
    console.log('this.Form.valu',this.Form.value)
    if (this.Form.invalid) {
      return;
    }
    this.service.create(this.Form.value).subscribe((event: HttpEvent<any>) => {
      console.log('eventtype',event)
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
          console.log('User successfully created!', event.body);
          setTimeout(() => {
            this.progress = 0;
          }, 1500);
        }
    })
  }
}
