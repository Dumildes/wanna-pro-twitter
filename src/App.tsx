import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { Home } from './pages/Home'
import { Explore } from './pages/Explore'
import { Notifications } from './pages/Notifications'
import { Messages } from './pages/Messages'
import { Bookmarks } from './pages/Bookmarks'
import { Profile } from './pages/Profile'

export default function App() {
  return (
    <Router>
      <div className="flex">
        <div className="w-[275px] fixed h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 ml-[275px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}