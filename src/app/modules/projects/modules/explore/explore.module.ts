import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ExploreComponent} from "./components/explore/explore.component";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatStepperModule} from "@angular/material/stepper";
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


const routes: Routes = [
  {
    path: '',
    component: ExploreComponent
  }
]

@NgModule({
  declarations: [ExploreComponent, CreateProjectComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})
export class ExploreModule {
}
