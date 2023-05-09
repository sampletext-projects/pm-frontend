import {ParticipationRole} from "../enums/participation-role.enum";

export interface AddUserToProjectRequest {
  userId: string,
  projectId: string,
  role: ParticipationRole
}
