const trends = [
  {
    category: 'Technology · Trending',
    title: 'TypeScript',
    tweets: '25.4K',
  },
  {
    category: 'Sports · Trending',
    title: 'Champions League',
    tweets: '142K',
  },
  {
    category: 'Entertainment · Trending',
    title: '#NewMusic',
    tweets: '52.8K',
  },
  {
    category: 'Politics · Trending',
    title: '#Elections2024',
    tweets: '88.2K',
  },
]

export function TrendingTopics() {
  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="p-4 text-xl font-bold text-white">Trends for you</h2>
      {trends.map((trend, index) => (
        <div
          key={index}
          className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors"
        >
          <p className="text-sm text-gray-500">{trend.category}</p>
          <p className="font-bold text-white">{trend.title}</p>
          <p className="text-sm text-gray-500">{trend.tweets} Tweets</p>
        </div>
      ))}
      <a
        href="#"
        className="block p-4 text-blue-500 hover:bg-white/5 rounded-b-2xl transition-colors"
      >
        Show more
      </a>
    </div>
  )
}