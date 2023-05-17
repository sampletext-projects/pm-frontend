import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../../../../services/auth.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../../../../../interfaces/login-request.interface";
import {ProjectStyle} from "../../../../../../enums/project-style.enum";
import {ProjectService} from "../../../../../../services/project.service";
import {CreateProjectRequest} from "../../../../../../interfaces/create-project-request.interface";
import {Projects} from "@angular/cli/lib/config/workspace-schema";
import {ProjectVisibility} from "../../../../../../enums/project-visibility.enum";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({})
  isFormSent: boolean = false

  ProjectVisibilityType = ProjectVisibility;
  projectStyles = [
    // 'Не указан',
    {val: ProjectStyle.IT, label: 'IT'},
    {val: ProjectStyle.Design, label: 'Design'},
    {val: ProjectStyle.Marketing, label: 'Marketing'},
  ];

  constructor(
    private matSnackBar: MatSnackBar,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.maxLength(32)]),
      'description': new FormControl('', [Validators.maxLength(512)]),
      'style': new FormControl(0, [Validators.required]),
      'visibility': new FormControl(0, [Validators.required]),
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
    let request = <CreateProjectRequest>this.formGroup.value;
    this.projectService.create(request)
      .subscribe({
        next: () => {
          this.router.navigate(['projects', 'explore'])
        },
        complete: () => {
          this.isFormSent = false;
        }
      })
  }

  goToExplore() {
    this.router.navigate(['projects', 'explore'])
  }
}
