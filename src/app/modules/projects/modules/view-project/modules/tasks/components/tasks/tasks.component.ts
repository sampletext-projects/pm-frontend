import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../../../../../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskItem} from "../../../../../../../../interfaces/task-getbyproject-response.interface";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  projectId: string = '';
  tasks: TaskItem[] = [];

  constructor(
    private taskService: TaskService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.taskService.getByProject(this.projectId)
      .subscribe(response => {
        this.tasks = response.tasks;
      })
  }

  goToCreateTask() {
    this.router.navigate(['create'], {relativeTo: this._activatedRoute})
  }
}
