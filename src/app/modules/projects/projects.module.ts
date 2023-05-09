import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { ExploreComponent } from './modules/explore/components/explore/explore.component';
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: 'explore',
    loadChildren: () => import('./modules/explore/explore.module')
      .then(m => m.ExploreModule)
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/create-project/create-project.module')
      .then(m => m.CreateProjectModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./modules/view-project/view-project.module')
      .then(m => m.ViewProjectModule)
  },
  {
    path: '',
    redirectTo: 'explore'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProjectsModule { }
