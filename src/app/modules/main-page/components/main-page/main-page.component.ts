import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from "../../../../services/project.service";
import {Router} from "@angular/router";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @ViewChild("start") startRef!: ElementRef;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  goToNext() {
    this.startRef.nativeElement.classList.add('animate-scale')
    setTimeout(() => {
      if (this.authService.token.length) {
        this.router.navigate(['projects', 'explore'])
      } else {
        this.router.navigate(['auth', 'login'])
      }
    }, 200)
  }
}
