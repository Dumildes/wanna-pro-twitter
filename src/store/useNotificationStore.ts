import { create } from 'zustand'
import { Notification } from '../types'

interface NotificationStore {
  notifications: Notification[]
  markAsRead: (id: string) => void
  markAllAsRead: () => void
}

const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: '1',
    type: 'like',
    actor: {
      id: '2',
      name: 'TypeScript',
      username: 'typescript',
      avatar: 'https://avatars.githubusercontent.com/u/typescript?v=4',
      verified: true,
    },
    tweet: {
      id: '1',
      content: 'Just setting up my X clone! 🚀',
      author: {
        id: '1',
        name: 'Your Name',
        username: 'username',
        avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
        verified: true,
      },
      createdAt: new Date().toISOString(),
      likes: 42,
      retweets: 12,
      replies: 8,
      views: 1337,
      liked: false,
      retweeted: false,
    },
    createdAt: new Date().toISOString(),
    read: false,
  },
]

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: INITIAL_NOTIFICATIONS,
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    })),
}))