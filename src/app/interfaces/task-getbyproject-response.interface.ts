import {TaskStatus} from "../enums/task-status.enum";

export interface TaskGetByProjectResponse {
  tasks: TaskItem[]
}

export interface TaskItem {
  id: string,
  title: string,
  description: string | null,
  status: TaskStatus
}
