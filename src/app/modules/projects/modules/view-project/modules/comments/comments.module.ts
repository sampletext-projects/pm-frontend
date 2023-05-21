import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import {RouterModule, Routes} from "@angular/router";
import {ParticipantsComponent} from "../participants/components/participants/participants.component";
import {InviteComponent} from "../participants/components/invite/invite.component";
import {MatListModule} from "@angular/material/list";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  {
    path: '',
    component: CommentsComponent
  }
]

@NgModule({
  declarations: [
    CommentsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatListModule,
    MatProgressSpinnerModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class CommentsModule { }
