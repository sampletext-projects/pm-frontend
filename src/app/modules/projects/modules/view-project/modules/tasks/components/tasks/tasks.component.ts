import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../../../../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskItem} from "../../../../../../../../interfaces/task-getbyproject-response.interface";
import {TaskStatus} from "../../../../../../../../enums/task-status.enum";
import {CdkDragDrop, CdkDragExit} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
  projectId: string = '';
  tasks: TaskItem[] = [];

  @ViewChild("container") containerRef!: ElementRef<HTMLElement>;

  isLoading: boolean = false;

  createdTasks: TaskItem[] = []
  inProgressTasks: TaskItem[] = []
  testingTasks: TaskItem[] = []
  doneTasks: TaskItem[] = []

  constructor(
    private taskService: TaskService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.taskService.getByProject(this.projectId)
      .subscribe({
        next: response => {
          this.tasks = response.tasks;
          this.createdTasks = this.tasks.filter(x => x.status === TaskStatus.Created);
          this.inProgressTasks = this.tasks.filter(x => x.status === TaskStatus.InProgress);
          this.testingTasks = this.tasks.filter(x => x.status === TaskStatus.Testing);
          this.doneTasks = this.tasks.filter(x => x.status === TaskStatus.Done);
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  goToCreateTask() {
    this.router.navigate(['create'], {relativeTo: this._activatedRoute})
  }

  drop($event: CdkDragDrop<TaskItem[]>) {

  }
}
