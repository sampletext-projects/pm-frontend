import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./modules/main-page/main-page.module')
      .then(m => m.MainPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AuthModule)
  },
  {
    path: 'projects',
    loadChildren: () => import('./modules/projects/projects.module')
      .then(m => m.ProjectsModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {paramsInheritanceStrategy: 'always'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
