import {TaskStatus} from "../enums/task-status.enum";

export interface TaskItem {
  id: string,
  title: string,
  description: string | null,
  status: TaskStatus
}
