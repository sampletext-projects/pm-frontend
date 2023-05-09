export interface SearchUsersResponse {
  users: SearchUserItem[]
}

export interface SearchUserItem {
  id: string,
  email: string,
  username: string | null
}
