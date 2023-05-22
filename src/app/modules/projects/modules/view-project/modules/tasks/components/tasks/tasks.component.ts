import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../../../../../services/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TaskStatus} from "../../../../../../../../enums/task-status.enum";
import {CdkDragDrop, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {TaskModalComponent} from "../task-modal/task-modal.component";
import {TaskItem} from "../../../../../../../../interfaces/task-item.interface";
import {TaskCommentsModalComponent} from "../task-comments-modal/task-comments-modal.component";

interface TaskVisualItem {
  item: TaskItem,
  isUpdating: boolean
}

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

  createdTasks: TaskVisualItem[] = []
  inProgressTasks: TaskVisualItem[] = []
  testingTasks: TaskVisualItem[] = []
  doneTasks: TaskVisualItem[] = []

  constructor(
    private matSnackBar: MatSnackBar,
    private taskService: TaskService,
    private router: Router,
    private _activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    this.projectId = _activatedRoute.snapshot.params['id']
  }

  ngOnInit(): void {
    this.loadTasks()
  }

  loadTasks() {
    this.createdTasks = []
    this.inProgressTasks = []
    this.testingTasks = []
    this.doneTasks = []
    this.isLoading = true;
    this.taskService.getByProject(this.projectId)
      .subscribe({
        next: response => {
          this.tasks = response.tasks;
          this.createdTasks = this.tasks.filter(x => x.status === TaskStatus.Created).map(x => ({
            item: x,
            isUpdating: false
          }));
          this.inProgressTasks = this.tasks.filter(x => x.status === TaskStatus.InProgress).map(x => ({
            item: x,
            isUpdating: false
          }));
          this.testingTasks = this.tasks.filter(x => x.status === TaskStatus.Testing).map(x => ({
            item: x,
            isUpdating: false
          }));
          this.doneTasks = this.tasks.filter(x => x.status === TaskStatus.Done).map(x => ({
            item: x,
            isUpdating: false
          }));
        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  goToCreateTask() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {id: undefined, mode: 'create', projectId: this.projectId},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(hasValueChanged => {
      if (hasValueChanged) {
        this.loadTasks()
      }
    });
  }

  drop(event: CdkDragDrop<TaskVisualItem[], TaskVisualItem[], TaskVisualItem>) {

    if (event.previousContainer === event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      return;
    }

    let status: TaskStatus = TaskStatus.Unknown;

    switch (event.container.data) {
      case this.createdTasks:
        status = TaskStatus.Created;
        break;
      case this.inProgressTasks:
        status = TaskStatus.InProgress;
        break;
      case this.testingTasks:
        status = TaskStatus.Testing;
        break;
      case this.doneTasks:
        status = TaskStatus.Done;
        break;
    }
    event.item.data.isUpdating = true;
    this.taskService.changeStatus(event.item.data.item.id, status)
      .subscribe({
        error: () => {
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex,
          );
          // this.matSnackBar.open('Не удалось изменить статус задачи.', '', {duration: 1500})
          event.item.data.isUpdating = false;
        },
        complete: () => {
          event.item.data.isUpdating = false;
        }
      })
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
  }

  open(task: TaskVisualItem) {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      data: {id: task.item.id, mode: 'edit', projectId: this.projectId},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(hasValueChanged => {
      if (hasValueChanged) {
        this.loadTasks()
      }
    });
  }

  openComments($event: MouseEvent, task: TaskVisualItem) {
    $event.stopPropagation()

    const dialogRef = this.dialog.open(TaskCommentsModalComponent, {
      data: {taskId: task.item.id, projectId: this.projectId},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(hasValueChanged => {

    });
  }
}
