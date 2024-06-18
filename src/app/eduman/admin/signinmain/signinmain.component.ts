import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
// import { Router } from 'express';


@Component({
  selector: 'app-signinmain',
  templateUrl: './signinmain.component.html',
  styleUrls: ['./signinmain.component.scss']
})
export class SigninmainComponent {
  loginForm: FormGroup;
  userData: any;
  // CurrentRole: Roles = Roles.Representative;
  loading: boolean = false;
  visible: boolean = false;
  errors: any
  asyncErrors: any
  constructor(private user: AuthService, private formBilder: FormBuilder, private router: Router) {
    this.loginForm = formBilder.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  get mobile() {
    return this.loginForm.get('mobile')
  }
  get password() {
    return this.loginForm.get('password')
  }
  login() {
    console.log(this.loginForm.value);
    this.user.login(this.loginForm.value).subscribe({
      next: (data) => {
        this.userData = data;
        console.log(this.userData);
        localStorage.setItem('token', this.userData.result.token);
        const token = atob(this.userData.result.token.split('.')[1]);
        console.log(JSON.parse(token));
        if (token) {
          this.router.navigate(['/admin'])
        }
      },
      error: (err) => {
        console.log(err.error.message);
        this.errors = err.error.message
      }
    });
  }
}
