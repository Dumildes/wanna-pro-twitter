import { create } from 'zustand'
import { Message } from '../types'

interface MessageStore {
  messages: Message[]
  sendMessage: (content: string, recipientId: string) => void
  markAsRead: (id: string) => void
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: {
      id: '2',
      name: 'TypeScript',
      username: 'typescript',
      avatar: 'https://avatars.githubusercontent.com/u/typescript?v=4',
      verified: true,
    },
    recipient: {
      id: '1',
      name: 'Your Name',
      username: 'username',
      avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
      verified: true,
    },
    content: 'Hey! How are you liking TypeScript so far?',
    createdAt: new Date().toISOString(),
    read: false,
  },
]

export const useMessageStore = create<MessageStore>((set) => ({
  messages: INITIAL_MESSAGES,
  sendMessage: (content, recipientId) =>
    set((state) => ({
      messages: [
        {
          id: Math.random().toString(),
          content,
          sender: {
            id: '1',
            name: 'Your Name',
            username: 'username',
            avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
            verified: true,
          },
          recipient: state.messages.find(
            (m) => m.sender.id === recipientId || m.recipient.id === recipientId
          )?.sender || {
            id: recipientId,
            name: 'User',
            username: 'user',
            avatar: 'https://avatars.githubusercontent.com/u/0?v=4',
            verified: false,
          },
          createdAt: new Date().toISOString(),
          read: true,
        },
        ...state.messages,
      ],
    })),
  markAsRead: (id) =>
    set((state) => ({
      messages: state.messages.map((message) =>
        message.id === id ? { ...message, read: true } : message
      ),
    })),
}))