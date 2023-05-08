import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

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
    let request = this.formGroup.value;
    this.authService.login(request)
      .subscribe({
        next: () => {
          this.router.navigate(['home'])
        }
      })
    console.log(this.formGroup.value);
  }

  getLoginErrors() {
    return Object.entries(this.formGroup.controls['login'].errors ?? {})
  }
}
