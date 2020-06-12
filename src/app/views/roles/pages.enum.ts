import * as _ from 'underscore';
import * as nav from '../../_nav'

const pages = nav.navItems.find(ele => ele.name == 'Pages').children;
let pageObj = [];
const createArray = function (array, i) {
    i += 1;
    console.log('array[i-1]',array[i-1],array)
    if (array.length >= i) {
        if(array[i-1].children){
            createArray(array[i-1].children, 0)
        }
        if(array[i-1].slug!='service'){
            pageObj.push(array[i-1])
        }
        createArray(array, i)

    }
}
createArray(pages, 0);
export const setting = {
    modules: [
        {
            module: 'users',
            name: 'Users',
            permission: [
                { key: 'view', selected: false },
                { key: 'add', selected: false },
                { key: 'update', selected: false },
                { key: 'delete', selected: false },
            ]
        },
        {
            module: 'roles',
            name: 'Roles',
            permission: [
                { key: 'view', selected: false },
                { key: 'add', selected: false },
                { key: 'update', selected: false },
                { key: 'delete', selected: false },
            ]
        },
        {
            module: 'media',
            name: 'Media',
            permission: [
                { key: 'view', selected: false },
                { key: 'add', selected: false },
                { key: 'update', selected: false },
                { key: 'delete', selected: false },
            ]
        }
    ],
    pages: pageObj
}
