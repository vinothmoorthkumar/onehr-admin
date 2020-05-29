import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private service: PageService) { }
  myTemplate:any;
  ngOnInit(): void {
    this.service.get('about_us').subscribe((response: any) => {
      this.myTemplate= response.data.html;
      console.log('test',response);
    });
  }

  publish() {
    let obj= {name:'About Us', html: '<h1>hello UNO test</h2>'};
    this.service.update('about_us',obj).subscribe((response: any) => {
      console.log('test');
    });
  }

}
