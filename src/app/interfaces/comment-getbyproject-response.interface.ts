import {ParticipationRole} from "../enums/participation-role.enum";

export interface CommentGetByProjectResponse {
  comments: CommentItem[]
}

export interface CommentItem {
  id: string,
  content: string,
  authorId: string,
  authorUsername: string,
  createdAt: Date
}
