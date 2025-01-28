import { useState } from 'react'
import { useNotificationStore } from '../store/useNotificationStore'
import { formatDistanceToNow } from 'date-fns'
import { HeartIcon, ArrowPathRoundedSquareIcon, ChatBubbleOvalLeftIcon, UserPlusIcon } from '@heroicons/react/24/solid'

const TABS = ['All', 'Verified', 'Mentions']

export function Notifications() {
  const [activeTab, setActiveTab] = useState('All')
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore()

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <HeartIcon className="w-5 h-5 text-pink-500" />
      case 'retweet':
        return <ArrowPathRoundedSquareIcon className="w-5 h-5 text-green-500" />
      case 'reply':
        return <ChatBubbleOvalLeftIcon className="w-5 h-5 text-blue-500" />
      case 'follow':
        return <UserPlusIcon className="w-5 h-5 text-blue-500" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur">
        <div className="px-4 py-3 border-b border-gray-800">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Notifications</h1>
            <button
              onClick={markAllAsRead}
              className="text-blue-500 hover:text-blue-400"
            >
              Mark all as read
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
      </header>

      <div className="divide-y divide-gray-800">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => markAsRead(notification.id)}
            className={`p-4 hover:bg-gray-900/50 cursor-pointer ${
              !notification.read ? 'bg-blue-500/5' : ''
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getNotificationIcon(notification.type)}
              </div>
              <div>
                <img
                  src={notification.actor.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div className="mt-2">
                  <span className="font-bold">{notification.actor.name}</span>
                  {notification.type === 'follow' ? (
                    <span className="text-gray-500"> followed you</span>
                  ) : (
                    <span className="text-gray-500">
                      {' '}
                      {notification.type === 'like'
                        ? 'liked'
                        : notification.type === 'retweet'
                        ? 'retweeted'
                        : 'replied to'}{' '}
                      your Tweet
                    </span>
                  )}
                </div>
                {notification.tweet && (
                  <p className="mt-2 text-gray-500">{notification.tweet.content}</p>
                )}
                <p className="mt-2 text-sm text-gray-500">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}