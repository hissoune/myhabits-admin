"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, CheckCircle, Award, BarChart3, Settings, LogOut, ChevronDown, X } from "lucide-react"

interface SidebarProps {
  isMobile?: boolean
  onMobileClose?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile = false, onMobileClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Overview", icon: <Home size={20} />, path: "/dashboard" },
    { name: "Statistics", icon: <BarChart3 size={20} />, path: "/dashboard/statistics" },
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/users" },
    { name: "Habits", icon: <CheckCircle size={20} />, path: "/dashboard/habits" },
    { name: "Challenges", icon: <Award size={20} />, path: "/dashboard/challenges" },
  ]

  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    return pathname.startsWith(path) && path !== "/dashboard"
  }

  return (
    <aside
      className={`${isMobile ? "fixed inset-y-0 left-0 z-50" : "sticky top-0 h-screen"} bg-gray-800 border-r border-gray-700/50 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between border-b border-gray-700/50">
        <div className={`flex items-center gap-2 ${isCollapsed && "justify-center w-full"}`}>
          <Image
            src="https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg"
            alt="Admine logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span
            className={`text-xl font-bold text-amber-500 transition-opacity duration-300 ${
              isCollapsed ? "opacity-0 hidden" : "opacity-100"
            }`}
          >
            Admine
          </span>
        </div>

        {isMobile ? (
          <button onClick={onMobileClose} className="text-gray-400 hover:text-amber-500 transition-colors">
            <X size={20} />
          </button>
        ) : (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-amber-500 transition-colors"
          >
            {isCollapsed ? (
              <ChevronDown size={20} className="rotate-90" />
            ) : (
              <ChevronDown size={20} className="-rotate-90" />
            )}
          </button>
        )}
      </div>

      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-amber-500/20 text-amber-500"
                    : "text-gray-400 hover:bg-gray-700/50 hover:text-gray-200"
                } ${isCollapsed ? "justify-center" : ""}`}
              >
                {item.icon}
                <span className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
                  {item.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700/50">
        <button
          className={`flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:bg-gray-700/50 hover:text-gray-200 transition-colors ${isCollapsed ? "justify-center" : ""}`}
        >
          <LogOut size={20} />
          <span className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 hidden" : "opacity-100"}`}>
            Log Out
          </span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

