const suggestions = [
  {
    name: 'TypeScript',
    username: 'typescript',
    avatar: 'https://avatars.githubusercontent.com/u/typescript?v=4',
    verified: true,
  },
  {
    name: 'React',
    username: 'reactjs',
    avatar: 'https://avatars.githubusercontent.com/u/reactjs?v=4',
    verified: true,
  },
  {
    name: 'Tailwind CSS',
    username: 'tailwindcss',
    avatar: 'https://avatars.githubusercontent.com/u/tailwindcss?v=4',
    verified: true,
  },
]

export function WhoToFollow() {
  return (
    <div className="bg-gray-900 rounded-2xl">
      <h2 className="p-4 text-xl font-bold text-white">Who to follow</h2>
      {suggestions.map((user, index) => (
        <div
          key={index}
          className="px-4 py-3 flex items-center hover:bg-white/5 transition-colors"
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
          <div className="ml-3 flex-1">
            <div className="flex items-center">
              <span className="font-bold text-white">{user.name}</span>
              {user.verified && (
                <svg className="w-4 h-4 ml-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                </svg>
              )}
            </div>
            <p className="text-gray-500">@{user.username}</p>
          </div>
          <button className="bg-white text-black px-4 py-1.5 rounded-full font-bold hover:bg-white/90 transition-colors">
            Follow
          </button>
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