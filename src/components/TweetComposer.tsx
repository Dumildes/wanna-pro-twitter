import { useState, useRef, useEffect } from 'react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import { cn } from '../lib/utils'

interface TweetComposerProps {
  onTweet: (content: string, images?: File[]) => void
}

export function TweetComposer({ onTweet }: TweetComposerProps) {
  const [content, setContent] = useState('')
  const [images, setImages] = useState<File[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const MAX_CHARS = 280

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [content])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (content.trim()) {
      onTweet(content, images)
      setContent('')
      setImages([])
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length + images.length <= 4) {
      setImages(prev => [...prev, ...files])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const charsRemaining = MAX_CHARS - content.length
  const isNearLimit = charsRemaining <= 20
  const isOverLimit = charsRemaining < 0

  return (
    <form onSubmit={handleSubmit} className="border-b border-gray-800 p-4">
      <div className="flex">
        <img
          src="https://avatars.githubusercontent.com/u/12345678?v=4"
          alt="Your avatar"
          className="w-12 h-12 rounded-full"
        />
        <div className="ml-4 flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="w-full bg-transparent text-white resize-none outline-none text-xl"
            rows={1}
          />
          
          {images.length > 0 && (
            <div className="mt-2 grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="rounded-2xl object-cover w-full h-48"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-black/50 rounded-full p-1"
                  >
                    <span className="sr-only">Remove image</span>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-500 hover:bg-blue-500/10 rounded-full p-2"
              >
                <PhotoIcon className="w-5 h-5" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <span
                className={cn(
                  "text-sm",
                  isNearLimit ? "text-yellow-500" : "text-gray-500",
                  isOverLimit && "text-red-500"
                )}
              >
                {charsRemaining}
              </span>
              <button
                type="submit"
                disabled={isOverLimit || content.length === 0}
                className="bg-blue-500 text-white px-4 py-1.5 rounded-full font-bold disabled:opacity-50"
              >
                Tweet
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}