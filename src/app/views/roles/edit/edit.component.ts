import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { RolesService } from '../../../services';
import { Router, ActivatedRoute } from '@angular/router';
import * as settings from '../pages.enum'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormArray;
  name: string;
  submitted = false;
  edit = false;
  editObj: any;
  id: any;
  ModulessData = settings.setting.modules

  constructor(private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, private service: RolesService) {

  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    if (this.id) {
      this.edit = true;
      this.route.data.subscribe((response) => {
        this.editObj = response.role.data;
        this.name = this.editObj.name;
        this.ModulessData = this.editObj.acl;
        this.itemsAsObjects = this.editObj.page;
      });
    }
    this.form = new FormArray(this.ModulessData.map(x => new FormArray([])), this.customValidatorOverAll(1));
    this.ModulessData.forEach((x, index) => {
      const array = this.form.at(index) as FormArray
      x.permission.forEach(c => {
        array.push(new FormControl(c.selected))
      })
    })
  }

  submit(form) {
    console.log('itemsAsObjects 1', this.itemsAsObjects)
    // for (const property in this.itemsAsObjects) {
    //   this.itemsAsObjects[property] = this.itemsAsObjects[property].map(ele => ele.slug)
    // }

    this.submitted = true;
    if (form.valid && this.name) {
      form.value.forEach((x, i) => {
        x.forEach((c, j) => {
          this.ModulessData[i].permission[j].selected = c;
        })
      })
      if (this.edit) {
        this.service.update(this.id, { name: this.name, acl: this.ModulessData, page: this.itemsAsObjects }).subscribe((data: any) => {
          this.router.navigate(['/role/list']);
        });
      } else {
        this.service.create({ name: this.name, acl: this.ModulessData, page: this.itemsAsObjects }).subscribe((data: any) => {
          this.router.navigate(['/role/list']);
        });
      }
    }
  }

  // customValidator() {
  //   return (formArray: FormArray) => {
  //     return formArray.value.filter(x => x).length > 0 ? null : { error: "at leat one" }
  //   }
  // }
  customValidatorOverAll(min) {
    return (formArray: FormArray) => {
      let count = 0;

      formArray.value.forEach(x => {
        count += x ? x.filter(c => c).length : 0;
      })
      return count >= min ? null : { error: "At least select " + min }
    }
  }

  itemsAsObjects = {
    view: [],
    add: [],
    update: [],
    delete: []
  };
  autocompleteItemsAsObjects = settings.setting.pages

}
