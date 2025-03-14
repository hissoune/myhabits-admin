"use client"

import { useAppDispatch } from "@/app/hooks/useAppDispatch"
import type { RootState } from "@/app/store"
import { getAllChalengesAction } from "@/app/store/slices/chalengesSlice"
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
  UserPlus,
  Calendar,
  Users,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trophy,
} from "lucide-react"
import Image from "next/image"


const ChallengesPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { chalenges = [], isLoading } = useSelector((state: RootState) => state.chalenges)

  const [searchTerm, setSearchTerm] = useState("")
  const [frequencyFilter, setFrequencyFilter] = useState<string>("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isActionMenuOpen, setIsActionMenuOpen] = useState<string | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ type: string; challengeId: string } | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [challengesPerPage] = useState(6)

  useEffect(() => {
    dispatch(getAllChalengesAction())
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

  const filteredChallenges = chalenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFrequency =
      frequencyFilter === "all" || challenge.frequency.toLowerCase() === frequencyFilter.toLowerCase()

    return matchesSearch && matchesFrequency
  })

  const indexOfLastChallenge = currentPage * challengesPerPage
  const indexOfFirstChallenge = indexOfLastChallenge - challengesPerPage
  const currentChallenges = filteredChallenges.slice(indexOfFirstChallenge, indexOfLastChallenge)
  const totalPages = Math.ceil(filteredChallenges.length / challengesPerPage)

  const handleDelete = (challengeId: string) => {
    setConfirmAction({ type: "delete", challengeId })
  }

  const handleAddParticipants = (challengeId: string) => {
    console.log(`Add participants to challenge ${challengeId}`)
    router.push(`/dashboard/challenges/${challengeId}/participants`)
  }

  const confirmDelete = () => {
    if (confirmAction?.challengeId) {
      console.log(`Delete challenge ${confirmAction.challengeId}`)
      setConfirmAction(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate)
    const now = new Date()

    if (now > end) return "Ended"

    const diffTime = Math.abs(end.getTime() - now.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day remaining"
    return `${diffDays} days remaining`
  }

  const getFrequencyBadge = (frequency: string) => {
    let bgColor = ""
    const icon = <Calendar className="w-3 h-3 mr-1" />

    switch (frequency.toLowerCase()) {
      case "daily":
        bgColor = "bg-amber-900/30 text-amber-400"
        break
      case "weekly":
        bgColor = "bg-purple-900/30 text-purple-400"
        break
      case "monthly":
        bgColor = "bg-blue-900/30 text-blue-400"
        break
      default:
        bgColor = "bg-gray-700 text-gray-300"
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {icon}
        {frequency.charAt(0).toUpperCase() + frequency.slice(1)}
      </span>
    )
  }

  const calculateProgress = (participants?: { userId: string; progress: number }[]) => {
    if (!participants || participants.length === 0) return 0

    const totalProgress = participants.reduce((sum, participant) => sum + participant.progress, 0)
    return Math.round(totalProgress / participants.length)
  }

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Challenge Management</h2>
          <p className="text-gray-400">Create and manage challenges for your users.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search challenges..."
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
              <span>Frequency</span>
              <ChevronDown size={16} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                <div className="py-1">
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "all" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("all")
                      setIsFilterOpen(false)
                    }}
                  >
                    All Frequencies
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "daily" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("daily")
                      setIsFilterOpen(false)
                    }}
                  >
                    Daily
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "weekly" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("weekly")
                      setIsFilterOpen(false)
                    }}
                  >
                    Weekly
                  </button>
                  <button
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${frequencyFilter === "monthly" ? "text-amber-500" : "text-gray-300"}`}
                    onClick={() => {
                      setFrequencyFilter("monthly")
                      setIsFilterOpen(false)
                    }}
                  >
                    Monthly
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-gray-900 rounded-lg text-sm hover:bg-amber-400 transition-colors"
            onClick={() => router.push("/dashboard/challenges/create")}
          >
            <Plus size={16} />
            <span>New Challenge</span>
          </button>
        </div>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
        </div>
      ) : (
        <>
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentChallenges.map((challenge) => (
              <div
                key={challenge._id}
                className="bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden hover:border-amber-500/50 transition-all duration-300 shadow-lg flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={challenge.image || "/placeholder.svg?height=200&width=400&text=Challenge"}
                    alt={challenge.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white line-clamp-1">{challenge.title}</h3>
                      <div className="relative">
                        <button
                          onClick={() =>
                            setIsActionMenuOpen(isActionMenuOpen === challenge._id ? null : challenge._id || null)
                          }
                          className="p-1 text-gray-200 hover:text-white rounded-md hover:bg-gray-700/50 transition-colors"
                        >
                          <MoreHorizontal size={16} />
                        </button>

                        {isActionMenuOpen === challenge._id && (
                          <div className="absolute right-0 bottom-5 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-40">
                            <div className="py-1">
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                                onClick={() => handleAddParticipants(challenge._id || "")}
                              >
                                <UserPlus size={16} />
                                <span>Add Participants</span>
                              </button>
                              <button
                                className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors flex items-center gap-2"
                                onClick={() => handleDelete(challenge._id || "")}
                              >
                                <Trash2 size={16} />
                                <span>Delete Challenge</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex gap-2 mb-3">
                    {getFrequencyBadge(challenge.frequency)}
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                      {challenge.repeats} repeats
                    </span>
                  </div>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{challenge.description}</p>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Overall Progress</span>
                      <span>{calculateProgress(challenge.participants)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-amber-500 h-2 rounded-full"
                        style={{ width: `${calculateProgress(challenge.participants)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">
                        {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-400">{challenge.participants?.length || 0} participants</span>
                    </div>
                    <span className="text-xs text-amber-500">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {getTimeRemaining(challenge.endDate)}
                    </span>
                  </div>

                  {challenge.creator && (
                    <div className="mt-4 pt-4 border-t border-gray-700/50 flex items-center gap-3">
                      {challenge.creator.image ? (
                        <Image
                          src={challenge.creator.image || "/placeholder.svg"}
                          alt={challenge.creator.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 text-xs font-medium">
                          {challenge.creator.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm text-gray-400">Created by {challenge.creator.name}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {currentChallenges.length === 0 && (
            <motion.div
              variants={itemVariants}
              className="bg-gray-800 rounded-xl border border-gray-700/50 p-10 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {chalenges.length === 0
                    ? "There are no challenges in the system yet. Create your first challenge to get started."
                    : "No challenges match your current filters. Try adjusting your search or filter criteria."}
                </p>
                {chalenges.length === 0 ? (
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-gray-900 rounded-lg text-sm hover:bg-amber-400 transition-colors"
                    onClick={() => router.push("/dashboard/challenges/create")}
                  >
                    <Plus size={16} />
                    <span>Create First Challenge</span>
                  </button>
                ) : (
                  <button
                    className="text-amber-500 hover:text-amber-400 transition-colors"
                    onClick={() => {
                      setSearchTerm("")
                      setFrequencyFilter("all")
                    }}
                  >
                    Clear all filters
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {filteredChallenges.length > challengesPerPage && (
            <motion.div variants={itemVariants} className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstChallenge + 1} to {Math.min(indexOfLastChallenge, filteredChallenges.length)} of{" "}
                {filteredChallenges.length} challenges
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

      {confirmAction && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Delete Challenge</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this challenge? This action cannot be undone and will remove the challenge
              for all participants.
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

export default ChallengesPage

