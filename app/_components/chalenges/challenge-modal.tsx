"use client"

import { useState, useEffect } from "react"
import { Search, X, Check } from 'lucide-react'
import Image from "next/image"
import { chalenge, User } from "@/types"



interface ChallengeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (challenge: chalenge) => void
  challenge?: chalenge|null
  users: User[]
  modalType: "create" | "update"
}

const ChallengeModal = ({
  isOpen,
  onClose,
  onSubmit,
  challenge,
  users,
  modalType = "create"
}: ChallengeModalProps) => {
  const [formData, setFormData] = useState<chalenge>({
    title: "",
    description: "",
    image: "",
    frequency: "daily",
    repeats: 1,
    startDate: "",
    endDate: "",
    participants: [],
  })

  const [userSearchTerm, setUserSearchTerm] = useState("")
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  useEffect(() => {
    if (challenge && modalType === "update") {
      setFormData(challenge)
      setSelectedUserIds(challenge?.participants?.map(p => p.userId) ?? [])
    } else {
      setFormData({
        title: "",
        description: "",
        image: "",
        frequency: "daily",
        repeats: 1,
        startDate: "",
        endDate: "",
        participants: [],
      })
      setSelectedUserIds([])
    }
  }, [challenge, modalType])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleUserSelection = (userId: string) => {
    setSelectedUserIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId)
      } else {
        return [...prev, userId]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create participants array from selected user IDs
    // For update, preserve existing progress if the user was already a participant
    const participants = selectedUserIds.map(userId => {
      const existingParticipant = formData.participants?.find(p => p.userId === userId)
      return existingParticipant || { userId, progress: 0 }
    })

    const challengeToSubmit = {
      ...formData,
      participants,
    }

    onSubmit(challengeToSubmit)
    onClose()
  }

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">
            {modalType === "create" ? "Create New Challenge" : "Update Challenge"}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Challenge Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Enter challenge title"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="Describe the challenge"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-300">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="frequency" className="block text-sm font-medium text-gray-300">
                Frequency *
              </label>
              <select
                id="frequency"
                name="frequency"
                value={formData.frequency}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="repeats" className="block text-sm font-medium text-gray-300">
                Repeats *
              </label>
              <input
                type="number"
                id="repeats"
                name="repeats"
                value={formData.repeats}
                onChange={handleInputChange}
                required
                min={1}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-300">
                Start Date *
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="endDate" className="block text-sm font-medium text-gray-300">
                End Date *
              </label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">Participants</label>
            <div className="bg-gray-700 border border-gray-600 rounded-lg overflow-hidden">
              <div className="p-3 border-b border-gray-600">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 pl-10 bg-gray-600 border border-gray-500 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="max-h-60 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className="flex items-center justify-between p-3 hover:bg-gray-700/30 cursor-pointer"
                      onClick={() => toggleUserSelection(user._id || "")}
                    >
                      <div className="flex items-center gap-3">
                        {user.image ? (
                          <Image
                            src={user.image || "/placeholder.svg"}
                            alt={user.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500 font-medium">
                            {user.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{user.name}</div>
                          <div className="text-gray-400 text-xs">{user.email}</div>
                        </div>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center ${
                          selectedUserIds.includes(user._id || "") ? "bg-amber-500" : "border border-gray-500"
                        }`}
                      >
                        {selectedUserIds.includes(user._id || "") && <Check className="w-3 h-3 text-gray-900" />}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-400">
                    {users.length === 0 ? "No users found in the system." : "No users match your search."}
                  </div>
                )}
              </div>

              {selectedUserIds.length > 0 && (
                <div className="p-3 border-t border-gray-600">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">{selectedUserIds.length} users selected</span>
                    <button
                      type="button"
                      onClick={() => setSelectedUserIds([])}
                      className="text-xs text-amber-500 hover:text-amber-400"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-700">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-gray-900 transition-colors"
              >
                {modalType === "create" ? "Create Challenge" : "Update Challenge"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChallengeModal
