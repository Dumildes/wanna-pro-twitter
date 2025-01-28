import { create } from 'zustand'
import { User } from '../types'

interface UserStore {
  currentUser: User
  updateProfile: (updates: Partial<User>) => void
}

export const useUserStore = create<UserStore>((set) => ({
  currentUser: {
    id: '1',
    name: 'Your Name',
    username: 'username',
    avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
    verified: true,
    bio: 'Building awesome things with React and TypeScript ⚡️',
    following: 420,
    followers: 69,
    joinedDate: '2024-01',
  },
  updateProfile: (updates) =>
    set((state) => ({
      currentUser: { ...state.currentUser, ...updates },
    })),
}))