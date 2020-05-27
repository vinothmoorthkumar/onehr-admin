import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [

  {
    name: 'Users',
    url: '/user/list',
    icon: 'fa fa-user-circle fa-lg'
  },
  {
    name: 'Role',
    url: '/role/list',
    icon: 'fa fa-drivers-license-o',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'fa fa-newspaper-o fa-lg',
    children: [
      {
        name: 'Home',
        url: '/pages/home',
      },
      {
        name: 'About',
        url: '/buttons/dropdowns',
      },
      {
        name: 'Service',
        url: '/buttons/brand-buttons',
        children: [
          {
            name: 'Job Classification',
            url: '/buttons/dropdowns',
          },
          {
            name: 'Basic Reference Verification',
            url: '/buttons/dropdowns',
          },
          {
            name: 'Organizational Design',
            url: '/buttons/dropdowns',
          },
          {
            name: 'FAQ',
            url: '/buttons/dropdowns',
          },
        ]
      },
      {
        name: 'Contact',
        url: '/buttons/dropdowns',
      },
    ]
  },

];
