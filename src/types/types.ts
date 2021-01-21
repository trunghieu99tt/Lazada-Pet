export type User = {
  id: number
  username: string
  email: string
  avatar?: string | null
  role?: 'user' | 'admin'
  created_at?: string | null
  updated_at?: string | null
}
