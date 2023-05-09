export interface ProjectExploreResponse {
  projects: ProjectExploreItem[]
}

export interface ProjectExploreItem {
  id: string,
  title: string,
  description: string | null
}
