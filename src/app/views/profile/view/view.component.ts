import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService, AuthService } from '../../../services';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  @ViewChild('changePasswordModal') public changePasswordModal: ModalDirective;

  Form: FormGroup;
  PasswordForm: FormGroup;
  edit = false;
  Changesubmitted = false;
  id: any;
  constructor(private formBuilder: FormBuilder, public service: UsersService, private auth: AuthService,private toastr: ToastrService) { }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit(): void {
    const form: any = {
      username: [{ value: '', disabled: true }, Validators.required],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      name: [{ value: '', disabled: true }, Validators.required],
      role: [{ value: '', disabled: true }, [Validators.required]],
    };
    this.Form = this.formBuilder.group(form);
    let data = this.auth.getCurrentUser();
    this.Form.setValue({
      name: data.name || '',
      username: data.username || '',
      email: data.email || '',
      role: data.role || '',
    });
    this.id = data._id;
    this.PasswordForm = this.formBuilder.group({
      oldpassword: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validator: this.checkPasswords });



  }

  get f() { return this.Form.controls; }
  get pf() { return this.PasswordForm.controls; }

  updatePassword() {
    this.Changesubmitted = true;
    if (this.PasswordForm.invalid) {
      return;
    }
    let Obj=this.PasswordForm.value;
    Obj['id']=this.id;
    this.auth.changePassword(Obj).subscribe((data: any[]) => {
      this.changePasswordModal.hide();
      this.toastr.success('Updated Successfully', 'Success');
    }, error => {
      this.toastr.error(error.message, 'Error');
    });  
  }
}
