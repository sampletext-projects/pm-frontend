import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsComponent } from './components/participants/participants.component';
import {RouterModule, Routes} from "@angular/router";
import { InviteComponent } from './components/invite/invite.component';

const routes: Routes = [
  {
    path: '',
    component: ParticipantsComponent
  },{
    path: 'invite',
    component: InviteComponent
  }
]

@NgModule({
  declarations: [
    ParticipantsComponent,
    InviteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ParticipantsModule { }
