import { useState } from 'react'
import { TweetComposer } from '../components/TweetComposer'
import { TweetCard } from '../components/TweetCard'
import { SearchBar } from '../components/SearchBar'
import { TrendingTopics } from '../components/TrendingTopics'
import { WhoToFollow } from '../components/WhoToFollow'
import { useTweetStore } from '../store/useTweetStore'

export function Home() {
  const { tweets, addTweet } = useTweetStore()
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleTweet = (content: string, images?: File[]) => {
    const newTweet = {
      id: Math.random().toString(),
      content,
      author: {
        id: '1',
        name: 'Your Name',
        username: 'username',
        avatar: 'https://avatars.githubusercontent.com/u/12345678?v=4',
        verified: true,
      },
      createdAt: new Date().toISOString(),
      likes: 0,
      retweets: 0,
      replies: 0,
      views: 0,
      liked: false,
      retweeted: false,
      images: images ? images.map(image => URL.createObjectURL(image)) : undefined,
    }

    setIsRefreshing(true)
    setTimeout(() => {
      addTweet(newTweet)
      setIsRefreshing(false)
    }, 500)
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 border-x border-gray-800">
        <header className="sticky top-0 z-10 bg-black/80 backdrop-blur">
          <div className="px-4 py-3 border-b border-gray-800">
            <h1 className="text-xl font-bold">Home</h1>
          </div>
        </header>

        <TweetComposer onTweet={handleTweet} />

        {isRefreshing && (
          <div className="flex justify-center py-4">
            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}

        <div className="divide-y divide-gray-800">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>

      <aside className="hidden lg:block w-96 pl-4">
        <div className="sticky top-0 space-y-4">
          <SearchBar />
          <TrendingTopics />
          <WhoToFollow />
        </div>
       </aside>
    </div>
  )
}