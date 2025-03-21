"use client"

import type React from "react"
import { useEffect, useState } from "react"
import Sidebar from "../_components/dashboard/Sidebar"
import Header from "../_components/dashboard/Header"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { useRouter } from "next/navigation"
import { loadUser } from "../store/slices/authSlice"
import { useSelector } from "react-redux"
import { RootState } from "../store"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const {inAuth}=useSelector((state:RootState)=>state.auth)

  useEffect(() => {
    dispatch(loadUser())

   
  }, [dispatch, inAuth, router])

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex">
      <div className="hidden lg:block fixed inset-y-0 left-0 w-64">
        <Sidebar />
      </div>

      {isMobileSidebarOpen && (
        <>
          <Sidebar
            isMobile
            onMobileClose={() => setIsMobileSidebarOpen(false)}
          />
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
        </>
      )}

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header
          title="Dashboard"
          subtitle="Welcome back, Admin. Here's what's happening with your platform today."
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
