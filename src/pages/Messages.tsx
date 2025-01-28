import { useState } from 'react'
import { useMessageStore } from '../store/useMessageStore'
import { formatDistanceToNow } from 'date-fns'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

export function Messages() {
  const { messages, sendMessage, markAsRead } = useMessageStore()
  const [selectedChat, setSelectedChat] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState('')

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedChat && newMessage.trim()) {
      sendMessage(newMessage, selectedChat)
      setNewMessage('')
    }
  }

  const uniqueChats = messages.reduce((acc, message) => {
    const otherUser = message.sender.id === '1' ? message.recipient : message.sender
    if (!acc.find(chat => chat.id === otherUser.id)) {
      acc.push(otherUser)
    }
    return acc
  }, [] as Array<{ id: string; name: string; username: string; avatar: string }>)

  const selectedChatMessages = messages.filter(
    message =>
      message.sender.id === selectedChat || message.recipient.id === selectedChat
  )

  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="w-96 border-r border-gray-800">
        <header className="p-4 border-b border-gray-800">
          <h1 className="text-xl font-bold">Messages</h1>
        </header>
        <div className="divide-y divide-gray-800">
          {uniqueChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setSelectedChat(chat.id)
                messages
                  .filter(m => m.sender.id === chat.id && !m.read)
                  .forEach(m => markAsRead(m.id))
              }}
              className={`w-full p-4 hover:bg-gray-900 flex items-center space-x-4 ${
                selectedChat === chat.id ? 'bg-gray-900' : ''
              }`}
            >
              <img
                src={chat.avatar}
                alt=""
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1 text-left">
                <div className="flex items-center">
                  <span className="font-bold">{chat.name}</span>
                  <span className="text-gray-500 ml-2">@{chat.username}</span>
                </div>
                <p className="text-gray-500 truncate">
                  {messages.find(
                    m =>
                      m.sender.id === chat.id || m.recipient.id === chat.id
                  )?.content}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            <header className="p-4 border-b border-gray-800">
              <div className="flex items-center space-x-4">
                <img
                  src={uniqueChats.find(chat => chat.id === selectedChat)?.avatar}
                  alt=""
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h2 className="font-bold">
                    {uniqueChats.find(chat => chat.id === selectedChat)?.name}
                  </h2>
                  <p className="text-gray-500">
                    @{uniqueChats.find(chat => chat.id === selectedChat)?.username}
                  </p>
                </div>
              </div>
            </header>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedChatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender.id === '1' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-sm rounded-2xl p-4 ${
                      message.sender.id === '1'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800'
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-sm text-gray-300 mt-1">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-800">
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Start a new message"
                  className="flex-1 bg-gray-800 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-blue-500 text-white rounded-full p-2 disabled:opacity-50"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a message
          </div>
        )}
      </div>
    </div>
  )
}