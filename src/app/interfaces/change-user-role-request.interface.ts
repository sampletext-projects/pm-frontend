import {ParticipationRole} from "../enums/participation-role.enum";

export interface ChangeUserRoleRequest {
  participantId: string,
  projectId: string,
  role: ParticipationRole
}
