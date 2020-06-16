import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService,AuthorizationService } from '../../../services';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  Form: FormGroup;
  submitted = false;
  rolesList = [];
  edit = false;
  superadmin = false;
  id: any;
  constructor(private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public auth: AuthorizationService,
    private router: Router, private route: ActivatedRoute,
    public service: UsersService) { }

  ngOnInit(): void {
    const form: any = {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    };


    if (this.route.snapshot.params.id) {
      form.password = [''];
    }

    this.Form = this.formBuilder.group(form);
    this.id = this.route.snapshot.params.id;

    if (this.id) {
      this.Form.controls['username'].disable();
      this.edit = true;
      this.route.data.subscribe((response) => {
        let data = response.user.data;
        if(this.auth.IsSuperAdmin()){
          this.superadmin = true;
        }
        console.log('data',data)
        this.Form.setValue({
          name: data.name || '',
          username: data.username || '',
          email: data.email || '',
          role: data.role || '',
          password: '',
        });
      });
    }
    this.service.getRoles().subscribe((response: any) => {
      this.rolesList = response.data.result;
    });
  }

  get f() { return this.Form.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.Form.invalid) {
      return;
    }
    if (this.edit) {
      if (this.Form.value && !this.Form.value.password) {
        delete this.Form.value.password;
      }
      this.service.update(this.route.snapshot.params.id, this.Form.value).subscribe((data: any[]) => {
        this.router.navigate(['/user/list']);
      }, error => {
      });
    } else {
      this.service.create(this.Form.value).subscribe((data: any[]) => {
        this.router.navigate(['/user/list']);
      }, error => {
        this.toastr.error('Username Already Exist','Error');
      });
    }
  }

}
