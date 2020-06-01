import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services';
import { ActivatedRoute } from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  html: string;
  sections = [
    {
      name:'sec 1',
      html:"test",
    },
    {
      name:'sec 2',
      html:"test"
    },
    {
      name:'sec 3',
      html:"test"
    }
  ];
  constructor(private service: PageService, private route: ActivatedRoute, ) { }
  ngOnInit(): void {
    this.route.data.subscribe((response) => {
      this.html = response.page.data.html;
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

  publish() {
    let obj = { name: 'About Us', html: this.html};
    this.service.update('about_us', obj).subscribe((response: any) => {
      console.log('test');
    });
  }

}
