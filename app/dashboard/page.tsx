"use client"
import { motion } from "framer-motion"
import { Users, Clipboard, Trophy, UserPlus, ArrowUp, ArrowDown } from "lucide-react"
import { ElementType } from "react";

interface StatCardProps {
    title: string;
    value: string;
    icon: ElementType; 
    change: number;
    isIncrease: boolean;
  }

const StatCard = ({ title, value, icon: Icon, change, isIncrease }:StatCardProps) => (
  <motion.div
    className="bg-gray-800 p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-300">{title}</h3>
      <Icon className="text-amber-500 w-6 h-6" />
    </div>
    <p className="text-3xl font-bold text-white mb-2">{value}</p>
    <div className={`flex items-center ${isIncrease ? "text-green-500" : "text-red-500"}`}>
      {isIncrease ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
      <span className="ml-1 text-sm">{change}%</span>
    </div>
  </motion.div>
)

export default function Dashboard() {
  const stats = [
    { title: "Total Users", value: "1,234", icon: Users, change: 12, isIncrease: true },
    { title: "Active Habits", value: "5,678", icon: Clipboard, change: 7, isIncrease: true },
    { title: "Ongoing Challenges", value: "42", icon: Trophy, change: 3, isIncrease: false },
    { title: "User Groups", value: "89", icon: UserPlus, change: 15, isIncrease: true },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-amber-500">Admin Dashboard</h1>
        <p className="text-gray-400 mt-2">Welcome back! Here's an overview of your habit tracking platform.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-amber-500">Recent Activity</h2>
          <ul className="space-y-4">
            {[
              'User "JohnDoe" completed the "30 Days of Meditation" challenge',
              'New group "Fitness Enthusiasts" created with 15 members',
              "5 new users joined in the last hour",
              '"Morning Routine" became the most popular habit this week',
            ].map((activity, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded">
                {activity}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-semibold mb-4 text-amber-500">Top Performing Habits</h2>
          <ul className="space-y-4">
            {[
              "Daily Exercise - 89% completion rate",
              "Meditation - 76% completion rate",
              "Reading - 72% completion rate",
              "Healthy Eating - 68% completion rate",
            ].map((habit, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded flex justify-between items-center">
                <span>{habit.split(" - ")[0]}</span>
                <span className="text-amber-400">{habit.split(" - ")[1]}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

