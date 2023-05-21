import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {CommentService} from "../../../../../../../../services/comment.service";
import {CommentItem} from "../../../../../../../../interfaces/comment-getbyproject-response.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-comments-modal',
  templateUrl: './task-comments-modal.component.html',
  styleUrls: ['./task-comments-modal.component.scss']
})
export class TaskCommentsModalComponent implements OnInit {
  isLoading: boolean = false;
  comments: CommentItem[] = [];
  formGroup: FormGroup = new FormGroup({})
  isFormSent: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TaskCommentsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {taskId: string},
    private matSnackBar: MatSnackBar,
    private commentService: CommentService,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.formGroup = new FormGroup({
      'content': new FormControl('', [Validators.required, Validators.maxLength(512)]),
    })
  }

  ngOnInit(): void {
    this.loadComments()
  }

  loadComments() {

    this.isLoading = true;
    this.commentService.getByTask(this.data.taskId)
      .subscribe({
        next: response => {
          this.comments = response.comments
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  onSubmit() {
    if (!this.formGroup.valid) {
      this.matSnackBar.open('Заполните все поля', '', {duration: 3000})
      return;
    }
    this.isFormSent = true;
    this.commentService.createForTask(this.data.taskId, this.formGroup.controls['content'].value)
      .subscribe({
        next: () => {
          this.loadComments()
        },
        error: () => {
          this.isFormSent = false;
        },
        complete: () => {
          this.isFormSent = false;
        }
      })
  }

  onClose() {
    this.dialogRef.close()
  }
}
