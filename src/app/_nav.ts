import { INavData } from '@coreui/angular';

export const navItems: any = [

  {
    name: 'Users',
    url: '/user/list',
    acl: {
      module: 'users',
      permission:'view'
    },
    icon: 'fa fa-user-circle fa-lg'
  },
  {
    name: 'Role',
    url: '/role/list',
    acl: {
      module: 'roles',
      permission:'view'
    },
    icon: 'fa fa-drivers-license-o',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'fa fa-newspaper-o fa-lg',
    acl: {
      module: 'pages',
      permission:'view'
    },
    children: [
      {
        name: 'Home',
        url: '/pages/home',
      },
      {
        name: 'About Us',
        url: '/pages/about',
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
