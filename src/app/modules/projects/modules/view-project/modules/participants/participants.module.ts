import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantsComponent } from './components/participants/participants.component';
import {RouterModule, Routes} from "@angular/router";
import { InviteComponent } from './components/invite/invite.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatDialogModule} from "@angular/material/dialog";

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
        RouterModule.forChild(routes),
        MatCardModule,
        MatProgressSpinnerModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        DragDropModule,
        MatDialogModule
    ]
})
export class ParticipantsModule { }
