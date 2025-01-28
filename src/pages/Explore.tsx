import { useState } from 'react'
import { SearchBar } from '../components/SearchBar'
import { TrendingTopics } from '../components/TrendingTopics'
import { WhoToFollow } from '../components/WhoToFollow'
import { TweetCard } from '../components/TweetCard'
import { useTweetStore } from '../store/useTweetStore'

const TABS = ['For you', 'Trending', 'News', 'Sports', 'Entertainment']

export function Explore() {
  const [activeTab, setActiveTab] = useState('For you')
  const { tweets } = useTweetStore()

  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 border-x border-gray-800">
        <SearchBar />
        
        <div className="sticky top-12 z-10 bg-black/80 backdrop-blur">
          <nav className="flex border-b border-gray-800">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 hover:bg-gray-900 relative ${
                  activeTab === tab ? 'font-bold' : ''
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 rounded-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="divide-y divide-gray-800">
          {tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </main>

      <aside className="hidden lg:block w-96 pl-4">
        <div className="sticky top-0 space-y-4">
          <WhoToFollow />
        </div>
      </aside>
    </div>
  )
}