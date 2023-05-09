import {ParticipationRole} from "../enums/participation-role.enum";

export interface ParticipantGetByProjectResponse {
  participants: ParticipantItem[]
}

export interface ParticipantItem {
  id: string,
  email: string,
  username: string | null,
  role: ParticipationRole
}
