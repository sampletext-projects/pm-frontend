import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../../../services/project.service";
import {ProjectGetByIdResponse} from "../../../../../../interfaces/project-getbyid-response.interface";
import {ProjectStyle} from "../../../../../../enums/project-style.enum";
import {ProjectVisibility} from "../../../../../../enums/project-visibility.enum";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  id: string = ''
  project: ProjectGetByIdResponse = {
    title: '',
    description: null,
    style: ProjectStyle.Unknown,
    visibility: ProjectVisibility.Unknown
  };

  constructor(
    private _activatedRoute: ActivatedRoute,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.id = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.projectService.getById(this.id)
      .subscribe(response => {
        this.project = response
      })
  }

  goToExplore() {
    this.router.navigate(['projects', 'explore'])
  }
}
