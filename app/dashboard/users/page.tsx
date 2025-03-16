"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Filter, MoreHorizontal, ChevronDown, ChevronLeft, ChevronRight, UserIcon, Unlock, Ban } from "lucide-react"
import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import { banOrUnbanAction, getAllUsersAction } from "@/app/store/slices/authSlice"
import { useSelector } from "react-redux"
import type {  User } from "@/types"
import { RootState } from "@/app/store"

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ type: string; userId: string } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)

  const dispatch = useAppDispatch()
  const { users = [] } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    dispatch(getAllUsersAction())
  }, [dispatch])

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

  const filteredUsers = users.filter((user:User) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role === roleFilter

    return matchesSearch && (roleFilter === "all" || matchesRole)
  })

  const indexOfLastUser = currentPage * usersPerPage
  const indexOfFirstUser = indexOfLastUser - usersPerPage
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

  const handleDelete = (userId: string) => {
    setConfirmAction({ type: "delete", userId })
  }

  const confirmDelete = () => {
    if (confirmAction?.userId) {
      dispatch(banOrUnbanAction(confirmAction.userId))
      console.log(`Delete user ${confirmAction.userId}`)
      setConfirmAction(null)
    }
  }

  const formatDate = (date?: Date | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString()
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-gray-400">Manage your platform users and their permissions.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors w-full md:w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              <Filter size={16} />
              <span>Filter</span>
              <ChevronDown size={16} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${roleFilter === "all" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setRoleFilter("all")
                      setIsFilterOpen(false)
                    }}
                  >
                    All Users
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${roleFilter === "admin" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setRoleFilter("admin")
                      setIsFilterOpen(false)
                    }}
                  >
                    Admins
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${roleFilter === "client" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setRoleFilter("client")
                      setIsFilterOpen(false)
                    }}
                  >
                    Regular Users
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-400 text-sm border-b border-gray-700/50">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Birth Date</th>
                <th className="p-4 font-medium">Activity</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user:User) => (
                  <tr key={user._id} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                            width={40}
                            height={50}
                            className="rounded-full "
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-medium">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="capitalize">{user.role || "user"}</span>
                    </td>
                    <td className="p-4 text-gray-400">{formatDate(user.birthDay)}</td>
                    <td className={`${user.isBaned? 'p-4 text-red-400' :'p-4 text-green-400' }`}>{user.isBaned?"banned":"Active"}</td>
                    <td className="p-4">
                      <div className="relative">
                        <button
                          onClick={() => setIsActionMenuOpen(isActionMenuOpen === user._id ? null : user._id!)}
                          className="p-2 text-gray-400 hover:text-gray-200 rounded-md hover:bg-gray-700/50 transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {isActionMenuOpen === user._id && (
                          <div className="absolute  right-0 bottom-5 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl ">
                            <div className="py-1">
                              <button
                                className={`w-full text-left px-4 py-2 text-sm ${user.isBaned ?'text-green-400':'text-red-400'} hover:bg-gray-700 transition-colors flex items-center gap-2`}
                                onClick={() => handleDelete(user._id || "")}
                              >
                                 {user.isBaned ? <Unlock size={16} /> : <Ban size={16} />}              
                                  <span>{user.isBaned?"Unban":"Ban"} user</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400">
                    {users.length === 0 ? (
                      <div className="flex flex-col items-center py-6">
                        <UserIcon size={48} className="text-gray-600 mb-4" />
                        <p>No users found. Users will appear here once they are added to the system.</p>
                      </div>
                    ) : (
                      <div className="py-6">
                        <p>No users found matching your search criteria.</p>
                        <button
                          onClick={() => {
                            setSearchTerm("")
                            setRoleFilter("all")
                          }}
                          className="text-amber-500 hover:text-amber-400 mt-2"
                        >
                          Clear filters
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredUsers.length > usersPerPage && (
          <div className="p-4 border-t border-gray-700/50 flex items-center justify-between">
            <div className="text-sm text-gray-400">
              Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"} transition-colors`}
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-md ${currentPage === page ? "bg-amber-500 text-gray-900" : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"} transition-colors`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:text-gray-200 hover:bg-gray-700/50"} transition-colors`}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete User</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this user? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default UsersPage

