import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../../../../services/project.service";
import {ProjectExploreItem} from "../../../../../../interfaces/project-explore-response.interface";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../../../view-project/modules/tasks/components/task-modal/task-modal.component";
import {CreateProjectComponent} from "../create-project/create-project.component";

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

  isLoading: boolean = false
  projects: ProjectExploreItem[] = [];

  constructor(
    private matSnackBar: MatSnackBar,
    private projectService: ProjectService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.explore()
      .subscribe({
        next: response => {
          this.projects = response.projects
        },
        complete: () => {
          this.isLoading = false
        }
      })
  }

  openCreateProject() {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      data: {},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(hasValueChanged => {
      if (hasValueChanged) {
        this.loadProjects()
      }
    });
  }

  joinProject(id: string) {
    this.isLoading = true;
    this.projectService.join(id)
      .subscribe({
        next: () => {
          this.matSnackBar.open('Вы успешно присоединились к проекту', '', {duration: 3000})
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      })
  }

  openProject(id: string) {
    this.router.navigate(['projects', 'view', id])
  }

  logout() {
    this.router.navigate(['auth', 'login'])
  }
}
