import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskModalData} from "./task-modal-data.interface";
import {TaskService} from "../../../../../../../../services/task.service";
import {TaskStatus} from "../../../../../../../../enums/task-status.enum";
import {EditTaskRequest} from "../../../../../../../../interfaces/edit-task-request.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CreateTaskRequest} from "../../../../../../../../interfaces/create-task-request.interface";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isFormSent: boolean = false;
  isLoading: boolean = false;

  hasValueChanged: boolean = false;

  taskStatuses = [
    // 'Не указан',
    {val: TaskStatus.Created, label: 'Создано'},
    {val: TaskStatus.InProgress, label: 'В работе'},
    {val: TaskStatus.Testing, label: 'Тестируется'},
    {val: TaskStatus.Done, label: 'Завершено'},
  ];
  private projectId: string;

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskModalData,
    private taskService: TaskService,
    private matSnackBar: MatSnackBar,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.maxLength(32)]),
      'description': new FormControl(null, [Validators.maxLength(256)]),
      'status': new FormControl({
        value: this.data.mode === 'create' ? this.taskStatuses[0].val : null,
        disabled: true
      }, [])
    })
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    if (this.data.mode === 'edit') {
      this.isLoading = true;
      this.taskService.getById(this.data.id).subscribe({
        next: (r) => {
          this.formGroup.setValue(r)
        },
        complete: () => {
          this.isLoading = false;
        }
      })
    }
  }

  onSubmit() {

    if (!this.formGroup.valid) {
      this.matSnackBar.open('Заполните все поля', '', {duration: 3000})
      return;
    }

    this.isFormSent = true;
    if (this.data.mode === 'edit') {
      const request: EditTaskRequest = {
        taskId: this.data.id,
        title: this.formGroup.value.title,
        description: this.formGroup.value.description
      }
      this.taskService.edit(request)
        .subscribe({
          next: () => {
            this.matSnackBar.open('Сохранено', '', {duration: 3000});
            this.hasValueChanged = true;
          },
          complete: () => {
            this.isFormSent = false;
          }
        })
    } else if (this.data.mode === 'create') {
      const request: CreateTaskRequest = {
        projectId: this.projectId,
        title: this.formGroup.value.title,
        description: this.formGroup.value.description
      }
      this.taskService.create(request)
        .subscribe({
          next: () => {
            this.matSnackBar.open('Сохранено', '', {duration: 3000});
            this.hasValueChanged = true;
          },
          complete: () => {
            this.isFormSent = false;
          }
        })
    }
  }

  onClose() {
    this.dialogRef.close(this.hasValueChanged);
  }
}
