import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CreateProjectComponent} from './components/create-project/create-project.component';
import {RouterModule, Routes} from "@angular/router";
import {ExploreComponent} from "../explore/components/explore/explore.component";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatStepperModule} from "@angular/material/stepper";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatRadioModule} from "@angular/material/radio";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatIconModule} from "@angular/material/icon";

const routes: Routes = [
  {
    path: '',
    component: CreateProjectComponent
  }
]

@NgModule({
  declarations: [
    CreateProjectComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatToolbarModule,
        MatStepperModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatRadioModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule
    ]
})
export class CreateProjectModule {
}
