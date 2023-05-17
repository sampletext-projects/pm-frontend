import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TasksComponent} from './components/tasks/tasks.component';
import {MatButtonModule} from "@angular/material/button";
import {CreateTaskComponent} from './components/create-task/create-task.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";


const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  }, {
    path: 'create',
    component: CreateTaskComponent
  }
]


@NgModule({
  declarations: [
    TasksComponent,
    CreateTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    DragDropModule,
  ]
})
export class TasksModule {
}
