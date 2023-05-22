import {Component, OnInit} from '@angular/core';
import {CommentService} from "../../../../../../../../services/comment.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentItem} from "../../../../../../../../interfaces/comment-getbyproject-response.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  isLoading: boolean = false;
  private projectId: string = '';
  comments: CommentItem[] = [];
  formGroup: FormGroup = new FormGroup({})
  isFormSent: boolean = false;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
    this.formGroup = new FormGroup({
      'content': new FormControl('', [Validators.required, Validators.maxLength(512)]),
    })
  }

  ngOnInit(): void {
    this.loadComments()
  }

  loadComments(){

    this.isLoading = true;
    this.commentService.getByProject(this.projectId)
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
    this.commentService.createForProject(this.projectId, this.formGroup.controls['content'].value)
      .subscribe({
        next: () => {
          this.loadComments()
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isFormSent = false;
        }
      })
  }
}
