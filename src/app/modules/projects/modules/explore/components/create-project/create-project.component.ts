import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {ProjectStyle} from "../../../../../../enums/project-style.enum";
import {ProjectService} from "../../../../../../services/project.service";
import {CreateProjectRequest} from "../../../../../../interfaces/create-project-request.interface";
import {ProjectVisibility} from "../../../../../../enums/project-visibility.enum";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskModalData} from "../../../view-project/modules/tasks/components/task-modal/task-modal-data.interface";

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
    {val: ProjectStyle.Design, label: 'Дизайн'},
    {val: ProjectStyle.Marketing, label: 'Маркетинг'},
  ];

  constructor(
    public dialogRef: MatDialogRef<CreateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModalData,
    private matSnackBar: MatSnackBar,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.formGroup = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.maxLength(32)]),
      'description': new FormControl('', [Validators.maxLength(512)]),
      'style': new FormControl(0, [Validators.required, Validators.min(1)]),
      'visibility': new FormControl(0, [Validators.required, Validators.min(1)]),
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
          this.dialogRef.close(true)
        },
        complete: () => {
          this.isFormSent = false;
        }
      })
  }

  onClose() {
    this.dialogRef.close(false)
  }
}
