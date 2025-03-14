"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Bell, Search, ChevronDown, Menu, Download, Filter } from "lucide-react"
import { useSelector } from "react-redux"
import { RootState } from "@/app/store"
import Image from "next/image"

interface HeaderProps {
  title: string
  subtitle?: string
  onMenuClick: () => void
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, onMenuClick }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
 const {user, isLoading} = useSelector((state:RootState) => state.auth);
  const notifications = [
    {
      title: "New user milestone reached",
      message: "10,000 users have joined the platform!",
      time: "2 hours ago",
      isRead: false,
    },
    {
      title: "System update scheduled",
      message: "Maintenance planned for tonight at 2 AM UTC",
      time: "5 hours ago",
      isRead: false,
    },
    {
      title: "New feature deployed",
      message: "Group challenges are now available to all users",
      time: "1 day ago",
      isRead: true,
    },
    {
      title: "User feedback report",
      message: "Monthly user feedback report is ready for review",
      time: "2 days ago",
      isRead: true,
    },
  ]
  if (isLoading) {
    return null;
    
  }

  return (
    <header className="bg-gray-800/90 backdrop-blur-md border-b border-gray-700/50 py-4 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center">
        <button onClick={onMenuClick} className="text-gray-400 hover:text-amber-500 transition-colors mr-4 lg:hidden">
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          {subtitle && <p className="text-gray-400 text-sm">{subtitle}</p>}
        </div>
      </div>

      <div className="flex items-center gap-4">
        

        <div className="relative">
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="relative p-2 text-gray-400 hover:text-amber-500 transition-colors rounded-full hover:bg-gray-700/50"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="font-medium">Notifications</h3>
                <button className="text-xs text-amber-500 hover:text-amber-400">Mark all as read</button>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification, index) => (
                  <div
                    key={index}
                    className={`p-3 border-b border-gray-700 last:border-0 hover:bg-gray-700/50 transition-colors ${
                      !notification.isRead ? "bg-gray-700/30" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${!notification.isRead ? "bg-amber-500" : "bg-gray-600"}`}
                      ></div>
                      <div>
                        <h4 className="font-medium text-sm">{notification.title}</h4>
                        <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                        <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t border-gray-700 text-center">
                <Link href="/notifications" className="text-sm text-amber-500 hover:text-amber-400">
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

      
        <div className="relative">
          <button onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-gray-900 font-bold">
             <Image src={user?.image || "/default-profile.png"} alt="User profile image"
              width={32} height={32} className="rounded-full"/>
            </div>
            <span className="hidden md:block text-sm">{user?.name}</span>
            <ChevronDown size={16} className="hidden md:block text-gray-400" />
          </button>

          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
              <div className="p-3 border-b border-gray-700">
                <p className="font-medium">{user?.name}</p>
                <p className="text-gray-400 text-xs">{user?.email}</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                  Profile Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                  Account Settings
                </button>
                <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 transition-colors">
                  Help & Support
                </button>
              </div>
              <div className="py-1 border-t border-gray-700">
                <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors">
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header

