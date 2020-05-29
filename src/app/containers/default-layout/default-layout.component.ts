import { Component, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { AuthService, AuthorizationService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems = [];
  constructor(private authorization: AuthorizationService,private auth: AuthService, private router: Router) {
  }
  
  ngOnInit(){
    this.navItems=navItems.filter(ele=>{
      if(ele.acl && ele.acl.module && ele.acl.permission){
        return this.authorization.IsAuth(ele.acl.module,ele.acl.permission)
      }
      return true;
    })
  }

  checkpermission(){

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
