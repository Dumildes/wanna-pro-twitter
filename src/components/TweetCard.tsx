import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { HeartIcon, ArrowPathRoundedSquareIcon, ChatBubbleOvalLeftIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid'
import { Tweet } from '../types'
import { cn, formatNumber } from '../lib/utils'
import { useTweetStore } from '../store/useTweetStore'

interface TweetCardProps {
  tweet: Tweet
}

export function TweetCard({ tweet }: TweetCardProps) {
  const { toggleLike, toggleRetweet } = useTweetStore()
  const [isLikeAnimating, setIsLikeAnimating] = useState(false)

  const handleLike = () => {
    setIsLikeAnimating(true)
    toggleLike(tweet.id)
    setTimeout(() => setIsLikeAnimating(false), 300)
  }

  return (
    <article className="p-4 border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
      <div className="flex space-x-3">
        <img
          src={tweet.author.avatar}
          alt={tweet.author.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center text-sm">
            <span className="font-bold text-white">{tweet.author.name}</span>
            {tweet.author.verified && (
              <svg className="w-4 h-4 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
              </svg>
            )}
            <span className="text-gray-500 ml-1">@{tweet.author.username}</span>
            <span className="text-gray-500 mx-1">·</span>
            <span className="text-gray-500">
              {formatDistanceToNow(new Date(tweet.createdAt), { addSuffix: true })}
            </span>
          </div>
          
          <p className="mt-2 text-white whitespace-pre-wrap">{tweet.content}</p>
          
          {tweet.images && tweet.images.length > 0 && (
            <div className="mt-3 grid gap-2">
              {tweet.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt=""
                  className="rounded-2xl max-h-96 object-cover w-full"
                />
              ))}
            </div>
          )}

          <div className="mt-3 flex justify-between max-w-md">
            <button className="group flex items-center text-gray-500 hover:text-blue-500">
              <ChatBubbleOvalLeftIcon className="w-5 h-5 mr-2 group-hover:bg-blue-500/10 rounded-full p-1" />
              <span>{formatNumber(tweet.replies)}</span>
            </button>
            
            <button
              onClick={() => toggleRetweet(tweet.id)}
              className={cn(
                "group flex items-center text-gray-500 hover:text-green-500",
                tweet.retweeted && "text-green-500"
              )}
            >
              <ArrowPathRoundedSquareIcon className="w-5 h-5 mr-2 group-hover:bg-green-500/10 rounded-full p-1" />
              <span>{formatNumber(tweet.retweets)}</span>
            </button>
            
            <button
              onClick={handleLike}
              className={cn(
                "group flex items-center text-gray-500 hover:text-pink-500",
                tweet.liked && "text-pink-500"
              )}
            >
              {tweet.liked ? (
                <HeartIconSolid
                  className={cn(
                    "w-5 h-5 mr-2 group-hover:bg-pink-500/10 rounded-full p-1",
                    isLikeAnimating && "animate-ping"
                  )}
                />
              ) : (
                <HeartIcon className="w-5 h-5 mr-2 group-hover:bg-pink-500/10 rounded-full p-1" />
              )}
              <span>{formatNumber(tweet.likes)}</span>
            </button>
            
            <button className="group flex items-center text-gray-500 hover:text-blue-500">
              <ChartBarIcon className="w-5 h-5 mr-2 group-hover:bg-blue-500/10 rounded-full p-1" />
              <span>{formatNumber(tweet.views)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}