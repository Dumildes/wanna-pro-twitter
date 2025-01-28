import { Link, useLocation } from 'react-router-dom'
import {
  HomeIcon,
  HashtagIcon,
  BellIcon,
  EnvelopeIcon,
  BookmarkIcon,
  UserIcon,
  EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline'
import { HomeIcon as HomeIconSolid } from '@heroicons/react/24/solid'

const navigation = [
  { name: 'Home', href: '/', icon: HomeIcon, activeIcon: HomeIconSolid },
  { name: 'Explore', href: '/explore', icon: HashtagIcon },
  { name: 'Notifications', href: '/notifications', icon: BellIcon },
  { name: 'Messages', href: '/messages', icon: EnvelopeIcon },
  { name: 'Bookmarks', href: '/bookmarks', icon: BookmarkIcon },
  { name: 'Profile', href: '/profile', icon: UserIcon },
  { name: 'More', href: '/more', icon: EllipsisHorizontalCircleIcon },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col h-screen px-2">
      <div className="flex-1 mt-2">
        <Link to="/" className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-gray-900">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>

        <nav className="mt-2 space-y-1">
          {navigation.map((item) => {
            const Icon = location.pathname === item.href && item.activeIcon ? item.activeIcon : item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center px-4 py-2 text-xl text-white rounded-full hover:bg-gray-900"
              >
                <Icon className="w-7 h-7 mr-4" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <button className="w-full mt-4 bg-blue-500 text-white rounded-full py-3 font-bold text-lg hover:bg-blue-600 transition-colors">
          Tweet
        </button>
      </div>

      <div className="flex items-center p-4 mb-2 rounded-full hover:bg-gray-900 cursor-pointer">
        <img
          src="https://avatars.githubusercontent.com/u/12345678?v=4"
          alt="Your avatar"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3 flex-1">
          <p className="font-bold text-white">Your Name</p>
          <p className="text-gray-500">@username</p>
        </div>
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M4 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
          <path d="M20 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
        </svg>
      </div>
    </div>
  )
}