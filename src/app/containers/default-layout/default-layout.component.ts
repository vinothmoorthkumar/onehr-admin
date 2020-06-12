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
  constructor(private authorization: AuthorizationService, private auth: AuthService, private router: Router) {
  }

  ngOnInit() {

    if(this.authorization.IsSuperAdmin()){
      this.navItems = navItems
    }else{
      const createArray = (array, i) => {
        let pageObj = [];
        let pushobj = () => {
          if(array[i - 1].slug=='page' || array[i - 1].slug=='service'){
            pageObj.push(array[i - 1])
          }
          if (array[i - 1].page && array[i - 1].slug && this.authorization.IsPageAuth(array[i - 1].slug,'view')) {
            pageObj.push(array[i - 1])
          }
          if(!array[i - 1].page && this.authorization.IsAuth(array[i - 1].acl.module, array[i - 1].acl.permission)){
            pageObj.push(array[i - 1])
          }
        };
        let pushData = () => {
          i += 1;
          if (array.length >= i) {
  
            if (array[i - 1].children) {
              array[i - 1].children = createArray(array[i - 1].children, 0)
              pushobj();
              pushData();
            } else {
              pushobj();
              pushData()
            }
          }
        }
        pushData();
      
  
        return pageObj;
      }
      this.navItems =createArray(navItems, 0);
    }

  }

  checkpermission() {

  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
