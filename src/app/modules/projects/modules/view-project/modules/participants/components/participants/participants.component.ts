import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ParticipantService} from "../../../../../../../../services/participant.service";
import {ParticipantItem} from "../../../../../../../../interfaces/participant-getbyproject-response.interface";
import {ParticipationRole} from "../../../../../../../../enums/participation-role.enum";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {InviteComponent} from "../invite/invite.component";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {

  isLoading: boolean = false;
  projectId: string = '';
  allParticipants: ParticipantItem[] = [];
  admins: ParticipantItem[] = [];
  readonlys: ParticipantItem[] = [];

  creator: ParticipantItem = {
    id: '',
    username: '',
    role: ParticipationRole.Creator,
    email: ''
  };

  constructor(
    private participantService: ParticipantService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.participantService.getByProject(this.projectId)
      .subscribe({
        next: response => {
          this.allParticipants = response.participants;
          this.creator = this.allParticipants.find(x => x.role === ParticipationRole.Creator)!;
          this.admins = this.allParticipants.filter(x => x.role === ParticipationRole.Admin);
          this.readonlys = this.allParticipants.filter(x => x.role === ParticipationRole.Readonly);
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  getUsernameOrEmail(participant: ParticipantItem): string {
    return (participant.username === null || participant.username.length === 0) ? participant.email : participant.username;
  }

  drop(event: CdkDragDrop<ParticipantItem[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if (event.previousContainer.data === this.admins && event.container.data === this.readonlys) {
        this.isLoading = true;
        this.participantService.changeRole({
          participantId: event.previousContainer.data[event.previousIndex].id,
          projectId: this.projectId,
          role: ParticipationRole.Readonly
        })
          .subscribe({
            next: () => {
              transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
              );
            },
            error: () => {
              this.isLoading = false;
            },
            complete: () => {
              this.isLoading = false;
            }
          })
      } else if (event.previousContainer.data === this.readonlys && event.container.data === this.admins) {
        this.isLoading = true;
        this.participantService.changeRole({
          participantId: event.previousContainer.data[event.previousIndex].id,
          projectId: this.projectId,
          role: ParticipationRole.Admin
        })
          .subscribe({
              next: () => {
                transferArrayItem(
                  event.previousContainer.data,
                  event.container.data,
                  event.previousIndex,
                  event.currentIndex,
                );
              },
              error: () => {
                this.isLoading = false;
              },
              complete: () => {
                this.isLoading = false;
              }
            }
          )
      }
    }
  }

  openInvite() {
    this.dialog.open(InviteComponent, {
      data: {projectId: this.projectId},
      disableClose: true
    })
  }
}
