"use client"

import React, { useState } from 'react'
import { Calendar, Clock, BarChart2, CheckCircle, XCircle, AlertCircle, Filter, Search, ChevronDown, ArrowUpRight, Repeat, Bell, CalendarIcon } from 'lucide-react'

type Status = 'active' | 'completed' | 'failed' | 'paused'
type Frequency = 'daily' | 'weekly' | 'monthly'

interface Habit {
  _id?: string
  userId?: string
  progress?: number
  title: string
  description?: string
  frequency: Frequency
  reminderTime?: Date
  repeats: number
  sucsess: number
  fails: number
  status: Status
  createdAt: Date
  updatedAt: Date
}

// Mock data
const habits: Habit[] = [
  {
    _id: '1',
    title: 'Morning Meditation',
    description: 'Start the day with 15 minutes of mindfulness',
    frequency: 'daily',
    reminderTime: new Date('2024-01-28T07:00:00'),
    repeats: 30,
    sucsess: 25,
    fails: 5,
    status: 'active',
    progress: 83,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-28')
  },
  {
    _id: '2',
    title: 'Weekly Exercise',
    description: 'Three gym sessions per week',
    frequency: 'weekly',
    reminderTime: new Date('2024-01-28T18:00:00'),
    repeats: 12,
    sucsess: 10,
    fails: 2,
    status: 'active',
    progress: 75,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-28')
  },
  {
    _id: '3',
    title: 'Reading Goals',
    description: 'Read 30 pages every day',
    frequency: 'daily',
    reminderTime: new Date('2024-01-28T21:00:00'),
    repeats: 28,
    sucsess: 20,
    fails: 8,
    status: 'paused',
    progress: 65,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-28')
  }
]

const HabitsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [frequencyFilter, setFrequencyFilter] = useState<Frequency | 'all'>('all')

  const getStatusColor = (status: Status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20'
      case 'completed':
        return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20'
      case 'paused':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date)
  }

  const filteredHabits = habits.filter(habit => {
    const matchesSearch = habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         habit.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || habit.status === statusFilter
    const matchesFrequency = frequencyFilter === 'all' || habit.frequency === frequencyFilter
    return matchesSearch && matchesStatus && matchesFrequency
  })

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Habits Overview</h1>
          <p className="text-gray-600 dark:text-gray-300">Track and monitor habit progress</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Habits</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{habits.length}</h3>
            </div>
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <BarChart2 className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Success Rate</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round((habits.reduce((acc, h) => acc + h.sucsess, 0) / 
                           habits.reduce((acc, h) => acc + (h.sucsess + h.fails), 0)) * 100)}%
              </h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active Habits</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {habits.filter(h => h.status === 'active').length}
              </h3>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowUpRight className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Average Progress</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
                {Math.round(habits.reduce((acc, h) => acc + (h.progress || 0), 0) / habits.length)}%
              </h3>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <AlertCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search habits..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as Status | 'all')}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
            <option value="paused">Paused</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-transparent"
            value={frequencyFilter}
            onChange={(e) => setFrequencyFilter(e.target.value as Frequency | 'all')}
          >
            <option value="all">All Frequencies</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Habits Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredHabits.map(habit => (
          <div key={habit._id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{habit.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{habit.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(habit.status)}`}>
                  {habit.status.charAt(0).toUpperCase() + habit.status.slice(1)}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{habit.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 dark:bg-indigo-500 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${habit.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Repeat className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Repeats</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{habit.repeats}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Success</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{habit.sucsess}</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">Fails</span>
                  </div>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{habit.fails}</p>
                </div>
              </div>

              {/* Details */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
                    </span>
                  </div>
                  {habit.reminderTime && (
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTime(habit.reminderTime)}
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <CalendarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Created {formatDate(habit.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredHabits.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No habits found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default HabitsDashboard
