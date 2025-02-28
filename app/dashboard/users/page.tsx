"use client"

import { useState } from "react"
import {
  Search,
  Filter,
  MoreVertical,
  UserPlus,
  BarChart3,
  Users,
  Activity,
  Ban,
  Edit,
  CheckCircle,
} from "lucide-react"

// Mock data for demonstration
const mockUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    createdAt: "2023-05-12",
    role: "User",
    status: "Active",
    lastActive: "2 hours ago",
    completedHabits: 45,
    streakDays: 7,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: "2023-06-18",
    role: "Premium",
    status: "Active",
    lastActive: "1 day ago",
    completedHabits: 120,
    streakDays: 15,
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    createdAt: "2023-04-30",
    role: "User",
    status: "Blocked",
    lastActive: "30 days ago",
    completedHabits: 12,
    streakDays: 0,
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    createdAt: "2023-07-05",
    role: "Admin",
    status: "Active",
    lastActive: "5 minutes ago",
    completedHabits: 87,
    streakDays: 30,
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    createdAt: "2023-08-22",
    role: "User",
    status: "Inactive",
    lastActive: "15 days ago",
    completedHabits: 23,
    streakDays: 2,
  },
]

export default function AdminDashboard() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUser, setSelectedUser] = useState(null)

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Stats calculation
  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "Active").length
  const blockedUsers = users.filter((user) => user.status === "Blocked").length
  const premiumUsers = users.filter((user) => user.role === "Premium").length

  // Toggle user status
  const toggleUserStatus = (userId:number) => {
    setUsers(
      users.map((user) => {
        if (user.id === Number(userId)) {
          const newStatus = user.status === "Active" ? "Blocked" : "Active"
          return { ...user, status: newStatus }
        }
        return user
      }),
    )
  }

  return (
    <div className=" w-full min-h-screen p-6 mx-auto bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Manage users and track their habits</p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
          <UserPlus size={18} />
          <span>Add New User</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-300 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{totalUsers}</h3>
            </div>
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-full">
              <Users className="text-blue-600 dark:text-blue-300" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-gray-300 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Active Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{activeUsers}</h3>
            </div>
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <Activity className="text-green-600 dark:text-green-300" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-gray-300 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Blocked Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{blockedUsers}</h3>
            </div>
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <Ban className="text-red-600 dark:text-red-300" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-gray-300 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Premium Users</p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{premiumUsers}</h3>
            </div>
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <BarChart3 className="text-purple-600 dark:text-purple-300" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="text-gray-400" size={18} />
          </div>
          <input
            type="text"
            className="bg-gray-300 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2.5"
            placeholder="Search users by name or email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg">
          <Filter size={18} />
          <span>Filter</span>
        </button>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto bg-gray-300 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                User
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Created At
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Role
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Habit Stats
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-300 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 dark:text-indigo-300 font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Last active: {user.lastActive}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">{user.createdAt}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                        : user.role === "Premium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${
                      user.status === "Active"
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : user.status === "Blocked"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{user.completedHabits}</span> habits completed
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="font-medium">{user.streakDays}</span> day streak
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleUserStatus(user.id)}
                      className={`p-1 rounded-full ${user.status === "Active" ? "text-red-600 hover:bg-red-100 dark:hover:bg-red-900" : "text-green-600 hover:bg-green-100 dark:hover:bg-green-900"}`}
                      title={user.status === "Active" ? "Block User" : "Unblock User"}
                    >
                      {user.status === "Active" ? <Ban size={18} /> : <CheckCircle size={18} />}
                    </button>
                    <button
                      className="p-1 rounded-full text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="p-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      title="More Options"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredUsers.length}</span>{" "}
          of <span className="font-medium">{totalUsers}</span> users
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
            Next
          </button>
        </div>
      </div>

      {/* Habit Tracking Summary */}
      <div className="mt-8 bg-gray-300 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Habit Tracking Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg">
            <h3 className="text-green-800 dark:text-green-200 font-medium mb-2">Most Active Users</h3>
            <div className="space-y-3">
              {mockUsers
                .sort((a, b) => b.completedHabits - a.completedHabits)
                .slice(0, 3)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-green-600 dark:text-green-400 mr-2">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
                    </div>
                    <span className="font-medium text-green-700 dark:text-green-300">
                      {user.completedHabits} habits
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg">
            <h3 className="text-blue-800 dark:text-blue-200 font-medium mb-2">Longest Streaks</h3>
            <div className="space-y-3">
              {mockUsers
                .sort((a, b) => b.streakDays - a.streakDays)
                .slice(0, 3)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-6 h-6 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-blue-600 dark:text-blue-400 mr-2">
                        {index + 1}
                      </div>
                      <span className="text-gray-800 dark:text-gray-200">{user.name}</span>
                    </div>
                    <span className="font-medium text-blue-700 dark:text-blue-300">{user.streakDays} days</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-lg">
            <h3 className="text-purple-800 dark:text-purple-200 font-medium mb-2">User Engagement</h3>
            <div className="mt-2">
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active Users</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {Math.round((activeUsers / totalUsers) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(activeUsers / totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="mb-2">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Premium Users</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {Math.round((premiumUsers / totalUsers) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(premiumUsers / totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Blocked Users</span>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {Math.round((blockedUsers / totalUsers) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${(blockedUsers / totalUsers) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

