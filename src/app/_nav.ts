import { INavData } from '@coreui/angular';
import * as slug from './_slug'
export const navItems: any = [
  {
    name: 'Profile',
    url: '/profile/view',
    slug: 'profile',
    icon: 'fa fa-user-circle fa-lg'
  },
  {
    name: 'Users',
    url: '/user/list',
    slug: 'user',
    acl: {
      module: 'users',
      permission:'view'
    },
    icon: 'fa fa-users fa-lg'
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
    slug:slug.slug.page,
    page:true,
    acl: {
      module: 'pages',
      permission:'view'
    },
    children: [
      {
        name: 'Home',
        url: '/pages/home',
        slug: slug.slug.home,
        page:true
      },
      {
        name: 'About Us',
        url: '/pages/about',
        slug: slug.slug.aboutus,
        page:true
      },
      {
        name: 'Service',
        slug: slug.slug.service,
        noAdd:true,
        page:true,
        children: [
          {
            name: 'Job Classification',
            url: '/pages/our-services-job-classification',
            slug: slug.slug.job_classification,
            page:true
          },
          {
            name: 'Basic Reference Verification',
            url: '/pages/basic-reference-verification',
            slug: slug.slug.basic_reference_verification,
            page:true
          },
          {
            name: 'Organizational Design',
            url: '/pages/organizational-design',
            slug: slug.slug.organizational_design,
            page:true
          },
          {
            name: 'FAQ',
            url: '/pages/faq',
            slug: slug.slug.faq,
            page:true
          },
        ]
      },
      {
        name: 'Contact',
        url: '/pages/contact',
        slug: slug.slug.contact,
        page:true
      },
      {
        name: 'Others',
        page:true,
        noAdd:true,
        children: [
          {
            name: 'Asg Transcript',
            url: '/pages/asg-transcript',
            slug: slug.slug.asg_transcript,
            page:true
          },
        ]
      }
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
