import {Component, OnInit} from '@angular/core';
import {map, Observable, of, switchMap} from "rxjs";
import {FormControl, Validators} from "@angular/forms";
import {UsersService} from "../../../../../../../../services/users.service";
import {SearchUserItem} from "../../../../../../../../interfaces/search-users-response.interface";
import {ParticipationRole} from "../../../../../../../../enums/participation-role.enum";
import {ProjectService} from "../../../../../../../../services/project.service";
import {AddUserToProjectRequest} from "../../../../../../../../interfaces/add-user-to-project-request.interface";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  isSubmitting: boolean = false;
  RoleType = ParticipationRole;
  control = new FormControl({
    id: '',
    email: '',
    username: null
  });
  usersSearch: Observable<SearchUserItem[]> = of()
  roleControl = new FormControl(ParticipationRole.Unknown, [Validators.required]);
  projectId: string = '';

  constructor(
    private usersService: UsersService,
    private projectService: ProjectService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.usersSearch = this.control.valueChanges.pipe(
      map(value => this.usersService.search(this.control.value).pipe(map(r => r.users))),
      switchMap(x => x)
    );
  }

  getUsernameOrEmail(user: SearchUserItem): string {
    return (user.username === null || user.username.length === 0) ? user.email : user.username;
  }

  display(option: SearchUserItem): string {
    return this.getUsernameOrEmail(option);
  }

  onSubmit() {
    const request: AddUserToProjectRequest = {
      userId: this.control.value.id,
      projectId: this.projectId,
      role: this.roleControl.value
    }
    this.isSubmitting = true;
    this.projectService.addUserToProject(request)
      .subscribe({
        next: () => {
          this.isSubmitting = false;
          this.router.navigate(['./'], {relativeTo: this._activatedRoute})
        },
        error: () => {
          this.isSubmitting = false;
        }
      })
  }
}
