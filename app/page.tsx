"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-[family-name:var(--font-geist-sans)]">
      <header className="fixed w-full z-10 bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Image src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg" alt="Admine logo" width={50} height={40} priority />
          </motion.div>
          <nav className="hidden md:flex gap-6">
            {["Features", "Pricing", "About"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-purple-400 transition-colors"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>
          <button className="md:hidden text-gray-300 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </header>

      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-900 z-20 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-gray-300 focus:outline-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {["Features", "Pricing", "About"].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-2xl text-gray-300 hover:text-purple-400 transition-colors my-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </motion.a>
          ))}
        </motion.div>
      )}

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Transform Your Life,
            <br />
            One Habit at a Time
          </motion.h1>
          <motion.p
            className="text-xl text-gray-400 text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Admine empowers you to build lasting habits, track your progress, and achieve your goals with a beautiful,
            intuitive interface.
          </motion.p>
          <motion.div
            className="flex gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#get-started"
              className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition-colors"
            >
              Start Your Journey
            </a>
            <a
              href="#learn-more"
              className="bg-gray-800 text-gray-300 px-8 py-3 rounded-full hover:bg-gray-700 transition-colors"
            >
             Admin Log in 
            </a>
          </motion.div>
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Image
              src="https://i.pinimg.com/736x/f8/35/8b/f8358b20e9b05df2c9beaad1b0f86791.jpg"
              alt="Admine habit tracker app preview"
              width={2000}
              height={300}
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-8 right-0 w-32 h-32 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </motion.div>
        </div>
      </main>

      <footer className="bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <a href="#privacy" className="hover:text-purple-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-purple-400 transition-colors">
              Terms of Service
            </a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">
              Contact Us
            </a>
            <p>© 2025 Admine. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

