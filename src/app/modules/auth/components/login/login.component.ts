import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../../../interfaces/login-request.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})
  isFormSent: boolean = false

  constructor(
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(32)]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(32)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.matSnackBar.open('Заполните все поля', '', {duration: 3000})
      return;
    }
    this.isFormSent = true;
    let request = <LoginRequest>this.formGroup.value;
    this.authService.login(request)
      .subscribe({
        next: () => {
          this.isFormSent = false;
          this.router.navigate(['home'])
        },
        error: err => {
          this.isFormSent = false;
          console.log(err)
          // this.matSnackBar.open(err.error, '', {duration: 3000})
        }
      })
  }
}
