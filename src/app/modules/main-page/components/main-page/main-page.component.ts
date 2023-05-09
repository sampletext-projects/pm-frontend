import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../../../../services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['auth', 'login'])
  }

  goToRegister() {
    this.router.navigate(['auth', 'register'])
  }

  goToProjects() {
    this.router.navigate(['projects'])
  }
}
