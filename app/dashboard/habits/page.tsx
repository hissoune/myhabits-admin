"use client"

import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import type { RootState } from "@/app/store"
import { deleteHabitAction, getAllHabitsAction, reActiveHabitAction } from "@/app/store/slices/habitsSlice"
import { useRouter } from "next/navigation"
import type React from "react"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { motion } from "framer-motion"
import {
  Search,
  Filter,
  MoreHorizontal,
  Trash2,
  RefreshCw,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react"
import Image from "next/image"
import { Frequency, Status } from "@/types"



const HabitsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { habits = [], isLoading } = useSelector((state: RootState) => state.habits)

  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [frequencyFilter, setFrequencyFilter] = useState<string>("all")
  const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false)
  const [isFrequencyFilterOpen, setIsFrequencyFilterOpen] = useState(false)
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ type: string; habitId: string } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [habitsPerPage] = useState(5)

  useEffect(() => {
    dispatch(getAllHabitsAction())
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

  const filteredHabits = habits.filter((habit) => {
    const matchesSearch =
      habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (habit.description && habit.description.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesStatus =
      statusFilter === "all" || (habit.status && habit.status.toLowerCase() === statusFilter.toLowerCase())

    const matchesFrequency =
      frequencyFilter === "all" || habit.frequency.toLowerCase() === frequencyFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesFrequency
  })

  const indexOfLastHabit = currentPage * habitsPerPage
  const indexOfFirstHabit = indexOfLastHabit - habitsPerPage
  const currentHabits = filteredHabits.slice(indexOfFirstHabit, indexOfLastHabit)
  const totalPages = Math.ceil(filteredHabits.length / habitsPerPage)

  const handleReactivate = (habitId: string) => {
    setConfirmAction({ type: "reactivate", habitId })
  }

  const handleDelete = (habitId: string) => {
   
    setConfirmAction({ type: "delete", habitId })
  }

  const confirmReactivate = () => {
    if (confirmAction?.habitId) {
        dispatch(reActiveHabitAction(confirmAction?.habitId))

      console.log(`Reactivate habit ${confirmAction.habitId}`)
      setConfirmAction(null)
    }
  }

  const confirmDelete = () => {
    if (confirmAction?.habitId) {
        dispatch(deleteHabitAction(confirmAction?.habitId))
      console.log(`Delete habit ${confirmAction.habitId}`)
      setConfirmAction(null)
    }
  }

  const getStatusBadge = (status?: Status) => {
    if (!status) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
          <Clock className="w-3 h-3 mr-1" />
          Unknown
        </span>
      )
    }

    switch (status) {
      case Status.Active:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        )
      case Status.Completed:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        )
      case Status.Failed:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
            <XCircle className="w-3 h-3 mr-1" />
            Failed
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {status}
          </span>
        )
    }
  }

  const getFrequencyBadge = (frequency: Frequency) => {
    switch (frequency) {
      case Frequency.Daily:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            <Calendar className="w-3 h-3 mr-1" />
            Daily
          </span>
        )
      case Frequency.Weekly:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400">
            <Calendar className="w-3 h-3 mr-1" />
            Weekly
          </span>
        )
      case Frequency.Monthly:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
            <Calendar className="w-3 h-3 mr-1" />
            Monthly
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {frequency}
          </span>
        )
    }
  }

  const formatDate = (date?: Date) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleDateString()
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Habit Management</h2>
          <p className="text-gray-400">Track and manage habits across your platform.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded-lg py-2 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-colors w-full md:w-64"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsStatusFilterOpen(!isStatusFilterOpen)
                setIsFrequencyFilterOpen(false)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              <Filter size={16} />
              <span>Status</span>
              <ChevronDown size={16} />
            </button>

            {isStatusFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${statusFilter === "all" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setStatusFilter("all")
                      setIsStatusFilterOpen(false)
                    }}
                  >
                    All Statuses
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${statusFilter === "active" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setStatusFilter("active")
                      setIsStatusFilterOpen(false)
                    }}
                  >
                    Active
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${statusFilter === "completed" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setStatusFilter("completed")
                      setIsStatusFilterOpen(false)
                    }}
                  >
                    Completed
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${statusFilter === "failed" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setStatusFilter("failed")
                      setIsStatusFilterOpen(false)
                    }}
                  >
                    Failed
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setIsFrequencyFilterOpen(!isFrequencyFilterOpen)
                setIsStatusFilterOpen(false)
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm hover:bg-gray-700 transition-colors"
            >
              <Calendar size={16} />
              <span>Frequency</span>
              <ChevronDown size={16} />
            </button>

            {isFrequencyFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "all" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("all")
                      setIsFrequencyFilterOpen(false)
                    }}
                  >
                    All Frequencies
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "daily" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("daily")
                      setIsFrequencyFilterOpen(false)
                    }}
                  >
                    Daily
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "weekly" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("weekly")
                      setIsFrequencyFilterOpen(false)
                    }}
                  >
                    Weekly
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "monthly" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("monthly")
                      setIsFrequencyFilterOpen(false)
                    }}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            )}
          </div>

        
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <>
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentHabits.map((habit) => (
              <div
                key={habit._id}
                className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold line-clamp-1">{habit.title}</h3>
                    <div className="relative">
                      <button
                        onClick={() => setIsActionMenuOpen(isActionMenuOpen === habit._id ? null : habit._id || null)}
                        className="p-1 text-gray-400 hover:text-gray-200 rounded-md hover:bg-gray-700/50 transition-colors"
                      >
                        <MoreHorizontal size={16} />
                      </button>

                      {isActionMenuOpen === habit._id && (
                        <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                          <div className="py-1">
                            {habit.status === Status.Failed && (
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-green-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                                onClick={() => handleReactivate(habit._id || "")}
                              >
                                <RefreshCw size={16} />
                                <span>Reactivate Habit</span>
                              </button>
                            )}
                            <button
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                              onClick={() => handleDelete(habit._id || "")}
                            >
                              <Trash2 size={16} />
                              <span>Delete Habit</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {habit.description || "No description provided."}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {getStatusBadge(habit.status)}
                    {getFrequencyBadge(habit.frequency)}
                  </div>

                  {habit.progress !== undefined && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progress</span>
                        <span>{habit.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${habit.progress}%` }}></div>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">Created: {formatDate(habit.createdAt)}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {habit.sucsess !== undefined && (
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {habit.sucsess}
                        </span>
                      )}
                      {habit.fails !== undefined && (
                        <span className="text-red-500 flex items-center gap-1">
                          <XCircle className="w-3 h-3" />
                          {habit.fails}
                        </span>
                      )}
                    </div>
                  </div>

                  {habit.userId && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-3">
                      {habit.userId.image ? (
                        <Image
                          src={habit.userId.image || "https://i.pinimg.com/736x/56/32/57/563257d0396078fa1620a5154513a4d3.jpg"}
                          alt={habit.userId.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-medium">
                          {habit.userId.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-gray-400">{habit.userId.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Empty state */}
          {currentHabits.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-gray-800 rounded-xl border border-gray-700/50 p-10 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                  <Calendar className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No habits found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {habits.length === 0
                    ? "There are no habits in the system yet. Create your first habit to get started."
                    : "No habits match your current filters. Try adjusting your search or filter criteria."}
                </p>
                {habits.length === 0 ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-gray-900 rounded-lg text-sm hover:bg-amber-400 transition-colors"
                    onClick={() => router.push("/dashboard/habits/create")}
                  >
                    <Plus size={16} />
                    <span>Create First Habit</span>
                  </button>
                ) : (
                  <button
                    className="text-amber-500 hover:text-amber-400 transition-colors"
                    onClick={() => {
                      setSearchTerm("")
                      setStatusFilter("all")
                      setFrequencyFilter("all")
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* Pagination */}
          {filteredHabits.length > habitsPerPage && (
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstHabit + 1} to {Math.min(indexOfLastHabit, filteredHabits.length)} of{" "}
                {filteredHabits.length} habits
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
            </motion.div>
          )}
        </>
      )}

      {/* Confirmation Modal */}
      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">
              {confirmAction.type === "delete" ? "Delete Habit" : "Reactivate Habit"}
            </h3>
            <p className="text-gray-300 mb-6">
              {confirmAction.type === "delete"
                ? "Are you sure you want to delete this habit? This action cannot be undone."
                : "Are you sure you want to reactivate this habit? This will reset its failed status."}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction.type === "delete" ? confirmDelete : confirmReactivate}
                className={`px-4 py-2 rounded-lg ${
                  confirmAction.type === "delete" ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
                } text-white transition-colors`}
              >
                {confirmAction.type === "delete" ? "Delete" : "Reactivate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default HabitsPage

