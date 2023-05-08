import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";
import {RegisterRequest} from "../../../../interfaces/register-request.interface";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})
  isFormSent: boolean = false

  constructor(
    private matSnackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email, Validators.maxLength(32)]),
      'password': new FormControl('', [Validators.required, Validators.maxLength(32)]),
      'repeat': new FormControl('', [Validators.required, Validators.maxLength(32), this.passwordMatchValidator]),
      'username': new FormControl(null, [Validators.maxLength(32)])
    }, [])
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      this.matSnackBar.open('Заполните все поля', '', {duration: 3000})
      return;
    }
    this.isFormSent = true;
    let request = <RegisterRequest>this.formGroup.value;
    this.authService.register(request)
      .subscribe({
        next: () => {
          this.isFormSent = false;
          this.router.navigate(['auth', 'login'])
        },
        error: err => {
          this.isFormSent = false;
        }
      })
  }

  passwordMatchValidator: ValidatorFn = (): ValidationErrors | null => {
    if (this.formGroup.controls['password']?.value === this.formGroup.controls['repeat']?.value) {
      return null;
    } else {
      return {passwordMismatch: true}
    }
  }
}
