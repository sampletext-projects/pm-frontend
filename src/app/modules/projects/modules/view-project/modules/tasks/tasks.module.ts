import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {TasksComponent} from './components/tasks/tasks.component';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { TaskModalComponent } from './components/task-modal/task-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { TaskCommentsModalComponent } from './components/task-comments-modal/task-comments-modal.component';
import {MatLineModule} from "@angular/material/core";


const routes: Routes = [
  {
    path: '',
    component: TasksComponent
  }
]


@NgModule({
  declarations: [
    TasksComponent,
    TaskModalComponent,
    TaskCommentsModalComponent
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
    MatDialogModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatLineModule,
  ]
})
export class TasksModule {
}
