"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import Link from "next/link"
import { CheckCircle, BarChart3, Calendar, TrendingUp, Award, Bell, ArrowRight } from "lucide-react"
import { useAppDispatch } from "./hooks/useAppDispatch"
import { useRouter } from "next/navigation"
import { loadUser } from "./store/slices/authSlice"
import { useSelector } from "react-redux"
import { RootState } from "./store"

export default function Home() {

    const dispatch = useAppDispatch();
    const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {inAuth}=useSelector((state:RootState)=>state.auth)
useEffect(()=>
{
  if (inAuth)
  {
    router.push("/dashboard")
    
  }

  dispatch(loadUser())
},[inAuth])
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 text-amber-500" />,
      title: "Habit Tracking",
      description: "Track your daily habits with a simple, intuitive interface that makes consistency easy.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-amber-500" />,
      title: "Progress Analytics",
      description: "Visualize your progress with beautiful charts and detailed statistics.",
    },
    {
      icon: <Calendar className="w-6 h-6 text-amber-500" />,
      title: "Smart Reminders",
      description: "Never miss a habit with customizable reminders that adapt to your schedule.",
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-amber-500" />,
      title: "Goal Setting",
      description: "Set and achieve your goals with our proven methodology for habit formation.",
    },
  ]

  const testimonials = [
    {
      quote: "Admine transformed my morning routine. I've been consistent for over 6 months now!",
      author: "Sarah J.",
      role: "Fitness Coach",
    },
    {
      quote: "The analytics help me understand my patterns and improve consistently. Best habit app I've used.",
      author: "Michael T.",
      role: "Software Engineer",
    },
    {
      quote: "I've tried many habit trackers, but Admine's simplicity and effectiveness is unmatched.",
      author: "Elena R.",
      role: "Medical Student",
    },
  ]

  const stats = [
    { number: "10M+", label: "Active Users" },
    { number: "250M+", label: "Habits Tracked" },
    { number: "87%", label: "Success Rate" },
    { number: "4.8", label: "App Store Rating" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Header */}
      <header className="fixed w-full z-50 bg-gray-800/90 backdrop-blur-md border-b border-gray-700/50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex items-center gap-2"
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg"
                alt="Admine logo"
                width={40}
                height={40}
                priority
                className="rounded-md"
              />
              <span className="text-xl font-bold text-amber-500">Admine</span>
            </Link>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            {["Features", "Pricing", "Testimonials", "FAQ"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-amber-400 transition-colors font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <Link href="/login" className="text-gray-300 hover:text-amber-400 transition-colors font-medium">
                Log in
              </Link>
              <Link
                href="/signup"
                className="bg-amber-500 text-gray-900 px-5 py-2 rounded-full hover:bg-amber-400 transition-colors font-medium"
              >
                Get Started
              </Link>
            </motion.div>
          </nav>
          <button
            className="md:hidden text-gray-300 focus:outline-none z-30"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-800 z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center space-y-8">
              {["Features", "Pricing", "Testimonials", "FAQ"].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-2xl text-gray-300 hover:text-amber-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col gap-4 w-full items-center"
              >
                <Link
                  href="/login"
                  className="text-gray-300 hover:text-amber-400 transition-colors text-2xl"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-amber-500 text-gray-900 px-8 py-3 rounded-full hover:bg-amber-400 transition-colors font-medium w-full text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Started
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent opacity-50"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="lg:w-1/2 text-center lg:text-left">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 text-amber-500 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Transform Your Life,
                <br />
                One Habit at a Time
              </motion.h1>
              <motion.p
                className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Admine empowers you to build lasting habits, track your progress, and achieve your goals with a
                beautiful, intuitive interface designed for real results.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link
                  href="/signup"
                  className="bg-amber-500 text-gray-900 px-8 py-3 rounded-full hover:bg-amber-400 transition-colors text-center font-medium flex items-center justify-center gap-2 group"
                >
                  Start Your Journey
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/demo"
                  className="bg-gray-700 text-gray-300 px-8 py-3 rounded-full hover:bg-gray-600 transition-colors text-center font-medium"
                >
                  Watch Demo
                </Link>
              </motion.div>
              <motion.div
                className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Image
                      key={i}
                      src={`/placeholder.svg?height=32&width=32&text=User${i}`}
                      alt="User avatar"
                      width={32}
                      height={32}
                      className="rounded-full border-2 border-gray-900"
                    />
                  ))}
                </div>
                <p>Joined by 10,000+ people this month</p>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-gray-700/50">
                  <Image
                    src="https://i.pinimg.com/736x/f8/35/8b/f8358b20e9b05df2c9beaad1b0f86791.jpg"
                    alt="Admine habit tracker app preview"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                  <div className="absolute -bottom-8 right-0 w-32 h-32 bg-amber-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-gray-800 rounded-lg p-3 shadow-xl border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500 rounded-full p-2">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Weekly Progress</p>
                      <p className="font-bold text-white">+28% Improvement</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 bg-gray-800 rounded-lg p-3 shadow-xl border border-gray-700/50">
                  <div className="flex items-center gap-3">
                    <div className="bg-amber-500 rounded-full p-2">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Current Streak</p>
                      <p className="font-bold text-white">21 Days</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-4xl md:text-5xl font-bold text-amber-500 mb-2">{stat.number}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to build better habits and achieve your goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-gray-700/50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Screenshots */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Beautiful Interface</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Designed for clarity, simplicity, and effectiveness.
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 p-2 rounded-3xl border border-gray-700 shadow-xl">
                <Image
                  src="https://i.pinimg.com/736x/f8/35/8b/f8358b20e9b05df2c9beaad1b0f86791.jpg"
                  alt="Admine mobile app"
                  width={250}
                  height={500}
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-amber-500 rounded-full p-3 shadow-lg">
                <Bell className="w-5 h-5 text-gray-900" />
              </div>
            </motion.div>

            <motion.div
              className="relative mt-8 md:mt-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 p-2 rounded-3xl border border-gray-700 shadow-xl">
                <Image
                  src="https://i.pinimg.com/736x/f8/35/8b/f8358b20e9b05df2c9beaad1b0f86791.jpg"
                  alt="Admine mobile app"
                  width={250}
                  height={500}
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -top-4 -left-4 bg-amber-500 rounded-full p-3 shadow-lg">
                <Calendar className="w-5 h-5 text-gray-900" />
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-800 p-2 rounded-3xl border border-gray-700 shadow-xl">
                <Image
                  src="https://i.pinimg.com/736x/f8/35/8b/f8358b20e9b05df2c9beaad1b0f86791.jpg"
                  alt="Admine mobile app"
                  width={250}
                  height={500}
                  className="rounded-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-amber-500 rounded-full p-3 shadow-lg">
                <BarChart3 className="w-5 h-5 text-gray-900" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Join thousands of people who have transformed their habits with Admine.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={`/placeholder.svg?height=48&width=48&text=${testimonial.author.charAt(0)}`}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full bg-amber-500 text-white"
                  />
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                <div className="flex mt-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-amber-500/20 to-amber-600/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Transform Your Habits?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of people who have already changed their lives with Admine. Start your journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="bg-amber-500 text-gray-900 px-8 py-4 rounded-full hover:bg-amber-400 transition-colors text-center font-medium text-lg"
              >
                Get Started — It's Free
              </Link>
              <Link
                href="/pricing"
                className="bg-gray-700 text-gray-300 px-8 py-4 rounded-full hover:bg-gray-600 transition-colors text-center font-medium text-lg"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 border-t border-gray-700/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Image
                  src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg"
                  alt="Admine logo"
                  width={40}
                  height={40}
                  className="rounded-md"
                />
                <span className="text-xl font-bold text-amber-500">Admine</span>
              </div>
              <p className="text-gray-400 text-sm">
                Transform your habits, transform your life. Admine is your companion on the journey to better habits.
              </p>
              <div className="flex gap-4 mt-4">
                {["twitter", "facebook", "instagram", "github"].map((social) => (
                  <a
                    key={social}
                    href={`https://${social}.com`}
                    className="text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-amber-500 font-medium mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-gray-400 hover:text-amber-400 transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-500 font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-amber-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#careers" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#blog" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} Admine. All rights reserved.</p>
            <p className="mt-2">Made with ❤️ for better habits</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

