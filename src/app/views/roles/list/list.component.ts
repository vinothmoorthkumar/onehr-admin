import { Component, OnInit, ViewChild } from '@angular/core';
import { RolesService } from '../../../services';
import {ModalDirective} from 'ngx-bootstrap/modal';
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
  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(){
    this.service.get().subscribe((response: any) => {
      this.rolesList=response.data;
    });
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
