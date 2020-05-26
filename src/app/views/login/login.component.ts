import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  loginForm: FormGroup;
  submitted = false;
  error=false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthService
  ) { }
  public login(email: string, password: string) {
    this.router.navigate(['app'], { replaceUrl: true });
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/user']);
        },
        error => {
          console.log('error',error)
          this.error=true;
          // this.alertService.error(error);
          // this.loading = false;
        });
  }
}
