import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from '../../../services';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  deleteItem
  constructor(private service: RolesService) { }
  rolesList:[];

  length = 0;
  pageSize = 10;

  pageEvent: PageEvent;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    let index = 0
    if(this.pageEvent && this.pageEvent.pageIndex){
      index= this.pageEvent.pageIndex * this.pageSize;
    }
    this.service.get({skip:index,perPage:this.pageSize}).subscribe((response: any) => {
      if(response.data && response.data.result){
        this.rolesList=response.data.result;
        this.length = response.data.total;
      }
    });
  }

  changepage(){
    console.log('test',this.pageEvent)
    this.fetchData()
  }

  delete(){
    this.service.delete(this.deleteItem).subscribe((data: any) => {
      this.myModal.hide()
      this.fetchData();
    });
  }

  setDeleteId(id){
    this.deleteItem=id;
  }
}
