import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "../../../../../../../../services/task.service";
import {CreateTaskRequest} from "../../../../../../../../interfaces/create-task-request.interface";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isFormSent: boolean = false;
  private projectId: string = '';

  constructor(
    private matSnackBar: MatSnackBar,
    private taskService: TaskService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
    this.formGroup = new FormGroup({
      'title': new FormControl('', [Validators.required, Validators.maxLength(32)]),
      'description': new FormControl(null, [Validators.maxLength(256)])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {

    let request: CreateTaskRequest = {
      projectId: this.projectId,
      title: this.formGroup.value.title,
      description: this.formGroup.value.description,
    }
    this.isFormSent = true;
    this.taskService.create(request)
      .subscribe({
        next: x => {
          this.router.navigate(['../'], {relativeTo: this._activatedRoute})
        },
        complete: () => {
          this.isFormSent = false;
        }
      })
  }
}
