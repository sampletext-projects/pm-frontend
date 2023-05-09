import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './components/layout/layout.component';
import {RouterModule, Routes} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {PerfectScrollbarModule} from "ngx-perfect-scrollbar";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: ':id',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'tasks'
      },
      {
        path: 'tasks',
        loadChildren: () => import('./modules/tasks/tasks.module')
          .then(m => m.TasksModule)
      },
      {
        path: 'participants',
        loadChildren: () => import('./modules/participants/participants.module')
          .then(m => m.ParticipantsModule)
      },
      {
        path: 'comments',
        loadChildren: () => import('./modules/comments/comments.module')
          .then(m => m.CommentsModule)
      }
    ]
  }
]


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    PerfectScrollbarModule,
    MatIconModule
  ]
})
export class ViewProjectModule {
}
