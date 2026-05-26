'use client'

import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import MusicPlayer from './MusicPlayer'
import { useUIStore } from '@/lib/store'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useUIStore()

  return (
    <div className="flex flex-col h-screen bg-dark">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        {sidebarOpen && <Sidebar />}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      <MusicPlayer />
    </div>
  )
}
