import { create } from 'zustand'
import { Tweet } from '../types'

const INITIAL_TWEETS: Tweet[] = [
  {
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
  }
]

interface TweetStore {
  tweets: Tweet[]
  addTweet: (tweet: Tweet) => void
  toggleLike: (tweetId: string) => void
  toggleRetweet: (tweetId: string) => void
}

export const useTweetStore = create<TweetStore>((set) => ({
  tweets: INITIAL_TWEETS,
  addTweet: (tweet) => set((state) => ({ tweets: [tweet, ...state.tweets] })),
  toggleLike: (tweetId) =>
    set((state) => ({
      tweets: state.tweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              liked: !tweet.liked,
              likes: tweet.liked ? tweet.likes - 1 : tweet.likes + 1,
            }
          : tweet
      ),
    })),
  toggleRetweet: (tweetId) =>
    set((state) => ({
      tweets: state.tweets.map((tweet) =>
        tweet.id === tweetId
          ? {
              ...tweet,
              retweeted: !tweet.retweeted,
              retweets: tweet.retweeted ? tweet.retweets - 1 : tweet.retweets + 1,
            }
          : tweet
      ),
    })),
}))