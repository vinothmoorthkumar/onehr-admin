import { INavData } from '@coreui/angular';

export const navItems: any = [

  {
    name: 'Users',
    url: '/user/list',
    slug: 'home',
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
    slug:'page',
    page:true,
    acl: {
      module: 'pages',
      permission:'view'
    },
    children: [
      {
        name: 'Home',
        url: '/pages/home',
        slug: 'home',
        page:true
      },
      {
        name: 'About Us',
        url: '/pages/about',
        slug: 'about_us',
        page:true
      },
      {
        name: 'Service',
        url: '/buttons/brand-buttons',
        slug: 'service',
        page:true,
        children: [
          {
            name: 'Job Classification',
            url: '/buttons/dropdowns',
            slug: 'job_classification',
            page:true
          },
          {
            name: 'Basic Reference Verification',
            url: '/buttons/dropdowns',
            slug: 'basic_reference_verification',
            page:true
          },
          {
            name: 'Organizational Design',
            url: '/buttons/dropdowns',
            slug: 'organizational_design',
            page:true
          },
          {
            name: 'FAQ',
            url: '/buttons/dropdowns',
            slug: 'faq',
            page:true
          },
        ]
      },
      {
        name: 'Contact',
        url: '/buttons/dropdowns',
        slug: 'contact',
        page:true
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
  }

];
