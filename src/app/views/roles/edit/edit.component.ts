import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  form: FormArray;
  name: string;
  submitted = false;
  ModulessData = [
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
      module: 'pages',
      name: 'Pages',
      permission: [
        { key: 'view', selected: false },
        { key: 'add', selected: false },
        { key: 'update', selected: false },
        { key: 'delete', selected: false },
        { key: 'publish', selected: false }
      ]
    }
  ];

  

  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit(): void {
    this.form = new FormArray(this.ModulessData.map(x => new FormArray([])),this.customValidatorOverAll(1));

    //this give so formArray as hobbies you get
    this.ModulessData.forEach((x, index) => {  //for each hobiee
      const array = this.form.at(index) as FormArray
      x.permission.forEach(c => {
        array.push(new FormControl(c.selected))
      })
    })
  }

  submit(form) {
    this.submitted = true;
    if (form.valid) {
      form.value.forEach((x, i) => {
        x.forEach((c, j) => {
          this.ModulessData[i].permission[j].selected = c;
        })
      })
      console.log(this.ModulessData,this.name)
   
    }
  }
  // customValidator() {
  //   return (formArray: FormArray) => {
  //     return formArray.value.filter(x => x).length > 0 ? null : { error: "at leat one" }
  //   }
  // }
  customValidatorOverAll(min)
  {
    return (formArray: FormArray) => {
      let count=0;

      formArray.value.forEach(x=>{
         count+=x?x.filter(c=>c).length:0;
      })
      return count>=min?null:{error:"At least select "+min}
    }
  }

}
