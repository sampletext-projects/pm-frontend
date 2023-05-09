import {ProjectStyle} from "../enums/project-style.enum";
import {ProjectVisibility} from "../enums/project-visibility.enum";

export interface ProjectGetByIdResponse {
  title: string,
  description: string | null,
  style: ProjectStyle,
  visibility: ProjectVisibility
}
