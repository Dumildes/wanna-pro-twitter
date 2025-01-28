import { useState } from 'react'
import { useUserStore } from '../store/useUserStore'
import { useTweetStore } from '../store/useTweetStore'
import { TweetCard } from '../components/TweetCard'
import { CalendarIcon } from '@heroicons/react/24/outline'
import { format } from 'date-fns'

const TABS = ['Tweets', 'Replies', 'Media', 'Likes']

export function Profile() {
  const [activeTab, setActiveTab] = useState('Tweets')
  const { currentUser } = useUserStore()
  const { tweets } = useTweetStore()
  const userTweets = tweets.filter((tweet) => tweet.author.id === currentUser.id)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur">
        <div className="px-4 py-3 border-b border-gray-800">
          <h1 className="text-xl font-bold">{currentUser.name}</h1>
          <p className="text-gray-500">{userTweets.length} Tweets</p>
        </div>
      </header>

      <div className="relative">
        <div className="h-48 bg-gray-800"></div>
        <div className="absolute left-4 -bottom-16">
          <img
            src={currentUser.avatar}
            alt=""
            className="w-32 h-32 rounded-full border-4 border-black"
          />
        </div>
      </div>

      <div className="pt-20 px-4">
        <div className="flex justify-end mb-4">
          <button className="px-4 py-1.5 border border-gray-800 rounded-full font-bold hover:bg-gray-900">
            Edit profile
          </button>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold">{currentUser.name}</h2>
          <p className="text-gray-500">@{currentUser.username}</p>
          {currentUser.bio && <p className="mt-3">{currentUser.bio}</p>}

          <div className="flex items-center space-x-4 mt-3 text-gray-500">
            <CalendarIcon className="w-5 h-5" />
            <span>
              Joined {format(new Date(currentUser.joinedDate!), 'MMMM yyyy')}
            </span>
          </div>

          <div className="flex space-x-4 mt-3">
            <button className="hover:underline">
              <span className="font-bold">{currentUser.following}</span>{' '}
              <span className="text-gray-500">Following</span>
            </button>
            <button className="hover:underline">
              <span className="font-bold">{currentUser.followers}</span>{' '}
              <span className="text-gray-500">Followers</span>
            </button>
          </div>
        </div>

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

        <div className="divide-y divide-gray-800">
          {userTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      </div>
    </div>
  )
}