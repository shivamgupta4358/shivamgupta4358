"use client"

import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DoYouLikeMe() {
  const [showHeart, setShowHeart] = useState(false)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (showHeart) {
      const timer = setTimeout(() => setShowHeart(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [showHeart])

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleYesClick = () => {
    setShowHeart(true)
  }

  const handleNoHover = () => {
    const maxWidth = Math.min(window.innerWidth - 100, 300) // Limit max width
    const maxHeight = Math.min(window.innerHeight - 100, 400) // Limit max height
    const x = Math.random() * maxWidth - maxWidth / 2 // Center the range
    const y = Math.random() * maxHeight - maxHeight / 2 // Center the range
    setNoButtonPosition({ x, y })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-red-200 to-purple-200 flex flex-col items-center justify-between relative overflow-hidden p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full text-center bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-md z-10"
      >
        <span className="text-gray-600">Designed by</span>{' '}
        <a
          href="https://t.me/deki_sama"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <Send size={16} />
          <span>DEKI SAMA</span>
        </a>
      </motion.div>

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 overflow-hidden pointer-events-none"
          >
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.2, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute text-pink-300 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  fontSize: `${Math.random() * 2 + 1}rem`,
                }}
              >
                ❤️
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="text-center z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-4xl font-bold mb-8 text-pink-600">Do you like me?</h1>
        <div className="space-x-4">
          <button
            onClick={handleYesClick}
            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            Yes
          </button>
          <motion.button
            onMouseEnter={handleNoHover}
            animate={noButtonPosition}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-full transition-colors"
          >
            No
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showHeart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <svg width="200" height="200" viewBox="0 0 200 200" className="w-48 h-48">
              <motion.path
                d="M100 187.5c-60-50-90-95-90-125 0-27.5 22.5-50 50-50 15 0 30 7.5 40 20 10-12.5 25-20 40-20 27.5 0 50 22.5 50 50 0 30-30 75-90 125z"
                fill="none"
                stroke="#ff4b4b"
                strokeWidth="4"
                initial={{ pathLength: 0, fill: 'none' }}
                animate={{ 
                  pathLength: 1, 
                  fill: '#ff4b4b',
                  transition: { 
                    pathLength: { duration: 2, ease: "easeInOut" },
                    fill: { duration: 2, ease: [1, 0, 0.8, 1] }
                  }
                }}
              />
            </svg>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="text-center text-2xl font-bold text-pink-600 mt-4"
            >
              I like you too!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
