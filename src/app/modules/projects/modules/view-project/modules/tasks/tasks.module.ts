import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import { TasksComponent } from './components/tasks/tasks.component';
import {MatButtonModule} from "@angular/material/button";
import { CreateTaskComponent } from './components/create-task/create-task.component';


const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  },{
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
  ]
})
export class TasksModule { }
