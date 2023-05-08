import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../../services/project.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(private projectService: ProjectService) {
  }

  ngOnInit(): void {
  }

  do() {
    this.projectService.explore()
      .subscribe({
        next: () => {
          console.log("Received response")
        },
        error: (err) => {
          console.log(err.message)
        }
      })
  }
}
