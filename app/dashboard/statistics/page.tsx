"use client"

import type React from "react"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, CheckCircle, Calendar, Clock } from "lucide-react"

const StatisticsPage: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  const overallStats = [
    { title: "Total Habits Created", value: "145,621", change: "+15%", icon: <CheckCircle className="h-6 w-6" /> },
    { title: "Total Habits Completed", value: "98,432", change: "+12%", icon: <Calendar className="h-6 w-6" /> },
    { title: "Average Completion Rate", value: "67.6%", change: "+3.2%", icon: <BarChart3 className="h-6 w-6" /> },
    { title: "Average Streak Length", value: "14 days", change: "+2 days", icon: <TrendingUp className="h-6 w-6" /> },
    { title: "Active Users (Monthly)", value: "8,741", change: "+8%", icon: <Users className="h-6 w-6" /> },
    { title: "Average Session Time", value: "12m 24s", change: "+1m 12s", icon: <Clock className="h-6 w-6" /> },
  ]

  const topHabits = [
    { name: "Morning Meditation", users: 4521, completionRate: 78 },
    { name: "Daily Exercise", users: 3982, completionRate: 65 },
    { name: "Reading", users: 3654, completionRate: 72 },
    { name: "Journaling", users: 3241, completionRate: 81 },
    { name: "Drinking Water", users: 2987, completionRate: 89 },
  ]

  const timeOfDay = [
    { time: "Morning (5AM-11AM)", percentage: 42 },
    { time: "Afternoon (12PM-5PM)", percentage: 28 },
    { time: "Evening (6PM-9PM)", percentage: 22 },
    { time: "Night (10PM-4AM)", percentage: 8 },
  ]

  const weekdayCompletion = [
    { day: "Monday", percentage: 82 },
    { day: "Tuesday", percentage: 78 },
    { day: "Wednesday", percentage: 76 },
    { day: "Thursday", percentage: 72 },
    { day: "Friday", percentage: 68 },
    { day: "Saturday", percentage: 58 },
    { day: "Sunday", percentage: 64 },
  ]

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants}>
        <h2 className="text-2xl font-bold mb-6">Detailed Statistics</h2>
        <p className="text-gray-400 mb-8">
          Comprehensive analytics about habits, user engagement, and platform performance.
        </p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-medium mb-4">Overall Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {overallStats.map((stat, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-xl p-6 border border-gray-700/50 hover:border-amber-500/50 transition-colors"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-green-500 text-sm">{stat.change}</span>
                    <span className="text-gray-500 text-xs ml-1">vs last period</span>
                  </div>
                </div>
                <div className="bg-gray-700/50 w-10 h-10 rounded-lg flex items-center justify-center text-amber-500">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl border border-gray-700/50">
        <div className="p-4 border-b border-gray-700/50 flex justify-between items-center">
          <h3 className="font-medium">Top Habits by User Count</h3>
          <button className="text-amber-500 hover:text-amber-400 text-sm">View All</button>
        </div>
        <div className="p-4 space-y-4">
          {topHabits.map((habit, index) => (
            <div key={index} className="p-3 bg-gray-700/20 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{habit.name}</h4>
                <span className="text-xs text-gray-400">{habit.users.toLocaleString()} users</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${habit.completionRate}%` }}></div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">Completion rate</span>
                <span className="text-xs font-medium">{habit.completionRate}%</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl border border-gray-700/50">
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="font-medium">Habit Completion by Time of Day</h3>
          </div>
          <div className="p-4">
            <div className="space-y-4">
              {timeOfDay.map((time, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">{time.time}</span>
                    <span className="text-sm font-medium">{time.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${time.percentage}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl border border-gray-700/50">
          <div className="p-4 border-b border-gray-700/50">
            <h3 className="font-medium">Habit Completion by Day of Week</h3>
          </div>
          <div className="p-4">
            <div className="flex items-end h-48 gap-3">
              {weekdayCompletion.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-amber-500/80 rounded-t-md"
                    style={{ height: `${day.percentage * 0.48}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-400">{day.day.substring(0, 3)}</div>
                  <div className="text-xs font-medium">{day.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl border border-gray-700/50 p-6">
        <h3 className="font-medium mb-4">System Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-700/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Server Uptime</h4>
              <span className="text-green-500 text-xs">Operational</span>
            </div>
            <p className="text-2xl font-bold">99.98%</p>
            <p className="text-xs text-gray-400 mt-1">Last 30 days</p>
          </div>
          <div className="bg-gray-700/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">API Response</h4>
              <span className="text-green-500 text-xs">Optimal</span>
            </div>
            <p className="text-2xl font-bold">124ms</p>
            <p className="text-xs text-gray-400 mt-1">Average</p>
          </div>
          <div className="bg-gray-700/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Error Rate</h4>
              <span className="text-green-500 text-xs">Low</span>
            </div>
            <p className="text-2xl font-bold">0.05%</p>
            <p className="text-xs text-gray-400 mt-1">Last 24 hours</p>
          </div>
          <div className="bg-gray-700/20 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Database</h4>
              <span className="text-green-500 text-xs">Healthy</span>
            </div>
            <p className="text-2xl font-bold">28%</p>
            <p className="text-xs text-gray-400 mt-1">Capacity used</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default StatisticsPage

