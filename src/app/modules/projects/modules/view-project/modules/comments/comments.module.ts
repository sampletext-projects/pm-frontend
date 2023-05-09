import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentsComponent } from './components/comments/comments.component';
import {RouterModule, Routes} from "@angular/router";
import {ParticipantsComponent} from "../participants/components/participants/participants.component";
import {InviteComponent} from "../participants/components/invite/invite.component";
import { AddCommentComponent } from './components/add-comment/add-comment.component';


const routes: Routes = [
  {
    path: '',
    component: CommentsComponent
  },{
    path: 'add',
    component: AddCommentComponent
  }
]

@NgModule({
  declarations: [
    CommentsComponent,
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CommentsModule { }
