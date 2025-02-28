"use client"
import React, { ElementType, useState } from 'react'
import { Home, Users, Clipboard, Trophy, UserPlus, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from 'next/navigation';
 
interface SidebarLinkProps {
    href: string;
    icon: ElementType; 
    
    label: string;
    className?:string
    path:string
  }

const Sidebar = () =>{
      const [isLoading, setIsLoading] = useState(false)
    
    const path = usePathname();
  const router = useRouter();

    async function onlogout(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
    
        try {
          const response = await fetch("/api/logout", {
            method: "DELETE",
           
          })
    
          if (!response.ok) {
            throw new Error("Invalid credentials")
          }else {
                      router.push("/login")

          }
    
        } catch (error) {
          console.log(("Invalid email or password"));
          
        } finally {
          setIsLoading(false)
        }
      }
    
    return (
    
    <div className="bg-gray-900 text-gray-300 w-64 min-h-screen p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-amber-500 mb-6">Admin Panel</h2>
        <nav className="space-y-4">
          <SidebarLink href="/dashboard" icon={Home} label="Dashboard" path={path}/>
          <SidebarLink href="/dashboard/users" icon={Users} label="Users" path={path}/>
          <SidebarLink href="/dashboard/habits" icon={Clipboard} label="Habits" path={path}/>
          <SidebarLink href="/challenges" icon={Trophy} label="Challenges" path={path} />
          <SidebarLink href="/groups" icon={UserPlus} label="Groups" path={path}/>
        </nav>
      </div>
      <SidebarLink href="/api/logout" icon={LogOut} label="Logout" className="text-red-500"path={path} />
    </div>
  );
}
  
  const SidebarLink = ({ href, icon:Icon, label, className = "", path }:SidebarLinkProps) => (
    <Link href={href} className={`flex items-center space-x-3 p-2 rounded transition ${path === href ? "bg-gray-900" : "hover:bg-gray-800"} ${className}`}>
      <Icon className="w-5 h-5 text-amber-400" />
      <span>{label}</span>
    </Link>
  );

  export default Sidebar
