import { useTweetStore } from '../store/useTweetStore'
import { TweetCard } from '../components/TweetCard'

export function Bookmarks() {
  const { tweets } = useTweetStore()
  const bookmarkedTweets = tweets.filter((tweet) => tweet.bookmarked)

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-10 bg-black/80 backdrop-blur">
        <div className="px-4 py-3 border-b border-gray-800">
          <h1 className="text-xl font-bold">Bookmarks</h1>
          <p className="text-gray-500">@username</p>
        </div>
      </header>

      {bookmarkedTweets.length > 0 ? (
        <div className="divide-y divide-gray-800">
          {bookmarkedTweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Save Tweets for later</h2>
          <p className="text-gray-500">
            Don't let the good ones fly away! Bookmark Tweets to easily find them
            again in the future.
          </p>
        </div>
      )}
    </div>
  )
}