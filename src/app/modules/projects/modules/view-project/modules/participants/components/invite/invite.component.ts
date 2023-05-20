import {Component, Inject, OnInit} from '@angular/core';
import {map, Observable, of, switchMap, tap} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../../../../../../../services/users.service";
import {SearchUserItem} from "../../../../../../../../interfaces/search-users-response.interface";
import {ParticipationRole} from "../../../../../../../../enums/participation-role.enum";
import {ProjectService} from "../../../../../../../../services/project.service";
import {AddUserToProjectRequest} from "../../../../../../../../interfaces/add-user-to-project-request.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskModalData} from "../../../tasks/components/task-modal/task-modal-data.interface";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  isSubmitting: boolean = false;
  RoleType = ParticipationRole;
  control = new FormControl(null, [Validators.required]);
  usersSearch$: Observable<SearchUserItem[]> = of([])
  roleControl = new FormControl(ParticipationRole.Unknown, [Validators.required, Validators.min(1)]);
  isSearching: boolean = false;

  constructor(
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: {projectId: string},
    private projectService: ProjectService,
    private router: Router,
    public dialogRef: MatDialogRef<InviteComponent>,
    private matSnackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.usersSearch$ = this.control.valueChanges.pipe(
      tap(() => this.isSearching = true),
      map(value => this.usersService.search(value).pipe(map(r => r.users))),
      switchMap(x => x),
      tap(() => this.isSearching = false)
    );
  }

  getUsernameOrEmail(user: SearchUserItem): string {
    return (user.username === null || user.username.length === 0) ? user.email : user.username;
  }

  display(option: SearchUserItem): string {
    return this.getUsernameOrEmail(option);
  }

  onSubmit() {
    if (this.control.invalid || this.roleControl.invalid) {
      this.matSnackBar.open('Заполните все поля', '', {duration: 3000})
      return;
    }

    const request: AddUserToProjectRequest = {
      userId: this.control.value.id,
      projectId: this.data.projectId,
      role: this.roleControl.value
    }
    this.isSubmitting = true;
    this.projectService.addUserToProject(request)
      .subscribe({
        next: () => {
          this.matSnackBar.open('Участник добавлен', '', {duration: 3000});
        },
        error: () => {
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      })
  }

  onClose() {
    this.dialogRef.close();
  }
}
