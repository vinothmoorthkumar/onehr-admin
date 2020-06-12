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
        slug: 'home'
      },
      {
        name: 'About Us',
        url: '/pages/about',
        slug: 'about_us'
      },
      {
        name: 'Service',
        url: '/buttons/brand-buttons',
        slug: 'service',
        children: [
          {
            name: 'Job Classification',
            url: '/buttons/dropdowns',
            slug: 'job_classification',
          },
          {
            name: 'Basic Reference Verification',
            url: '/buttons/dropdowns',
            slug: 'basic_reference_verification',
          },
          {
            name: 'Organizational Design',
            url: '/buttons/dropdowns',
            slug: 'organizational_design',
          },
          {
            name: 'FAQ',
            url: '/buttons/dropdowns',
            slug: 'faq',
          },
        ]
      },
      {
        name: 'Contact',
        url: '/buttons/dropdowns',
        slug: 'contact',
      },
    ]
  },
  {
    name: 'Media',
    url: '/media',
    acl: {
      module: 'media',
      permission:'view'
    },
    icon: 'fa fa-cloud-upload',
  },

];
