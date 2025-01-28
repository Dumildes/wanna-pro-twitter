export interface User {
  id: string
  name: string
  username: string
  avatar: string
  verified: boolean
  bio?: string
  following?: number
  followers?: number
  joinedDate?: string
}

export interface Tweet {
  id: string
  content: string
  author: User
  createdAt: string
  likes: number
  retweets: number
  replies: number
  views: number
  liked: boolean
  retweeted: boolean
  images?: string[]
  bookmarked?: boolean
}

export interface Message {
  id: string
  sender: User
  recipient: User
  content: string
  createdAt: string
  read: boolean
}

export interface Notification {
  id: string
  type: 'like' | 'retweet' | 'reply' | 'follow'
  actor: User
  tweet?: Tweet
  createdAt: string
  read: boolean
}