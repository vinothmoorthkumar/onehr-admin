import { Component, OnInit } from '@angular/core';
import { PageService, AuthorizationService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  html: string;
  sections = [];

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
    return this.auth.IsAuth('users',access);
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
    let obj = { name: 'About Us', html: this.sections };
    this.service.update('about_us', obj).subscribe((response: any) => {
      this.toastr.success('Updated Successfully', 'Success');
    });
  }

}
