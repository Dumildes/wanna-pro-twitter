import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

export function SearchBar() {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className="sticky top-0 bg-black z-10 py-2">
      <div className="relative">
        <div className={`
          absolute inset-y-0 left-3 flex items-center pointer-events-none
          ${isFocused ? 'text-blue-500' : 'text-gray-500'}
        `}>
          <MagnifyingGlassIcon className="w-5 h-5" />
        </div>
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-gray-900 rounded-full py-2 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-black"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  )
}