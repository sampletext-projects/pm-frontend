import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../../../../services/project.service";
import {ProjectExploreItem} from "../../../../../../interfaces/project-explore-response.interface";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.projectService.explore()
      .subscribe({
        next: response => {
          this.projects = response.projects
          this.isLoading = false
        },
        error: err => {
          this.isLoading = false
        }
      })
  }

  goToCreateProject() {
    this.router.navigate(['projects', 'create'])
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
}
