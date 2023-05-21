import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'explore',
    loadChildren: () => import('./modules/explore/explore.module')
      .then(m => m.ExploreModule)
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
