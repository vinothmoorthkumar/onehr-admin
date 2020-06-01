import { Component, OnInit } from '@angular/core';
import { PageService } from '../../../services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  html: string;
  constructor(private service: PageService, private route: ActivatedRoute, ) { }
  ngOnInit(): void {
    this.route.data.subscribe((response) => {
      this.html = response.page.data.html;
    })
  }

  publish() {
    let obj = { name: 'About Us', html: this.html};
    this.service.update('about_us', obj).subscribe((response: any) => {
      console.log('test');
    });
  }

}
