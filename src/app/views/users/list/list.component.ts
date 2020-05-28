import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @ViewChild('myModal') public myModal: ModalDirective;
  deleteItem
  constructor(private service: UsersService) { }
  usersList: [];

  length = 0;
  pageSize = 5;
  sort = {
    col: 'name',
    order: true
  }
  search = '';
  pageEvent: PageEvent;

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    let index = 0
    if (this.pageEvent && this.pageEvent.pageIndex) {
      index = this.pageEvent.pageIndex * this.pageSize;
    }
    let obj = { skip: index, perPage: this.pageSize, sort: this.sort, search: this.search };
    this.service.get(obj).subscribe((response: any) => {
      if (response.data && response.data.result) {
        this.usersList = response.data.result;
        this.length = response.data.total;
      }
    });
  }

  changepage() {
    this.fetchData()
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

}
