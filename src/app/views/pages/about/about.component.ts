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
    let html :string =`
    <div class="section">
  <div class="container-fluid">
    <div class="div-block-9">
      <div class="row-11 w-row">
        <div class="column-15 w-col w-col-6 w-col-stack">
          <h1 class="heading-1"><span class="color">-</span>Who we are</h1>
          <p class="paragraph about">OneHR is a network of UN organizations working together to offer advisory services
            for cost effective and risk-informed acquisition and management of talent across the UN System. OneHR
            provides services in the areas of organization design, job classification and reference checking and
            verification. All administrative decisions remain with the client organization, within its existing
            accountability framework. The center operates through a virtual network of specialized HR professionals
            providing services under a common operational umbrella.<br><br>OneHR offers enhanced pre-screening
            functions, which will save hiring managers time and standardize the processes around classification and
            reference checking. Consolidating knowledge assets across the UN system will dramatically improve the
            quality of job design and evaluation, and, expedite these processes for HR professionals. Consolidating
            reference verification history of personnel working in the UN system reduces duplication of efforts across
            the system and ensures systemwide adherence to new UN standards. These improvements will better support the
            UN’s effort to attract a truly diverse workforce, to attract the highest quality candidates, and deliver on
            the promise of gender parity.<br></p>
        </div>
        <div class="column-16 w-col w-col-6 w-col-stack">
          <div class="container-8 centered pow w-container">
            <a href="#" class="video-lightbox pow w-inline-block w-lightbox">
              <div class="video-lightbox-block about-us">
                <div class="video-lightbox-overlay">
                  <div class="video-lightbox-button line"><img
                      src="https://uploads-ssl.webflow.com/5b33f0d621d4b375fc418bb7/5b33f0d721d4b357c1418c5c_Icon-play-white.png"
                      class="video-lightbox-icon"></div>
                </div>
              </div>
              <script type="application/json" class="w-json">{
  "items": [
    {
      "type": "video",
      "originalUrl": "https://www.youtube.com/watch?v=miZhFFY5Mc0&autoplay=true",
      "url": "https://www.youtube.com/watch?v=miZhFFY5Mc0&autoplay=true",
      "html": "<iframe class=\"embedly-embed\" src=\"//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FmiZhFFY5Mc0%3Fautoplay%3D1%26feature%3Doembed&url=http%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DmiZhFFY5Mc0&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FmiZhFFY5Mc0%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&autoplay=1&type=text%2Fhtml&schema=youtube\" width=\"940\" height=\"528\" scrolling=\"no\" frameborder=\"0\" allow=\"autoplay; fullscreen\" allowfullscreen=\"true\"></iframe>",
      "thumbnailUrl": "https://i.ytimg.com/vi/miZhFFY5Mc0/hqdefault.jpg",
      "width": 940,
      "height": 528
    }
  ]
}</script>
            </a>
            <div class="section-title-wrapper full below-video"></div>
          </div>
        </div>
      </div>
      <p class="paragraph">The services of OneHR is made possible through the development of a first-generation case
        management tool. The OneHR information technology design team convened technical colleagues from all founding
        members of OneHR to co-design the client relationship management (CRM) solution for OneHR, including the design
        and execution of all templates, system-generated correspondence, and interfaces.<br></p><a
        href="documents/OneHR_Introduction-June-2018.pdf" class="button middle w-button">Download Brochure <br>File
        Size: 1.1 MB</a>
      <div class="line-divider"></div>
    </div>
    <div>
      <div class="div-block-10">
        <div>
          <div class="row w-row">
            <div class="w-col w-col-7">
              <div class="left-padding about-us">
                <div>
                  <h1 class="heading-1"><span class="color">-</span> Our mandate</h1>
                </div>
                <div class="top-margin">
                  <p class="paragraph">Secretary-General António Guterres has called upon the United Nations to become
                    more nimble, effective, transparent, accountable and efficient to better support its normative and
                    operational activities. The envisaged reforms will mean new ways of doing business for HR, and
                    thereby better equipping the organization to handle our complex, evolving challenges so that the UN
                    can more effectively and efficiently deliver on its global mandates.<br><br>OneHR is the first
                    initiative of its kind and forms a significant part of the UN’s corporate effort to continuously
                    offer improvements across the HR discipline, by offering consolidated services and greater
                    transparency and incubating innovative solutions.</p>
                </div>
              </div>
            </div>
            <div class="column w-col w-col-5">
              <div class="align-center"><img src="images/SG-9-200-300-official-2016.jpg" width="219"
                  alt="Photo of the Secretary General António Guterres"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    `
    let obj= {name:'About Us', html: html};
    this.service.update('about_us',obj).subscribe((response: any) => {
      console.log('test');
    });
  }

}
