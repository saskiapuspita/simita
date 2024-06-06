import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.createLoginFormGroup();
    this.signupForm = this.createSignUpFormGroup();
  }

  createLoginFormGroup(): FormGroup {
    return new FormGroup({
      nim: new FormControl('', [Validators.required]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  createSignUpFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      nim: new FormControl('', [Validators.required, Validators.minLength(10)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(7),
      ]),
    });
  }

  login(): void {
    this.authService
      .login(this.loginForm.value.nim, this.loginForm.value.password)
      .subscribe();
  }

  signup(): void {
    console.log(this.signupForm.value);
    this.authService.signup(this.signupForm.value).subscribe((msg) => {
      console.log(msg);
      window.location.reload();
      // this.router.navigate(['']);
    });
  }
}
