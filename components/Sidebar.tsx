'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiHome, FiMusic, FiTrendingUp, FiUsers, FiHeart, FiDownload } from 'react-icons/fi'

const navItems = [
  { icon: FiHome, label: 'Home', href: '/' },
  { icon: FiMusic, label: 'Browse Music', href: '/browse' },
  { icon: FiTrendingUp, label: 'Trending', href: '/trending' },
  { icon: FiUsers, label: 'Artists', href: '/artists' },
  { icon: FiHeart, label: 'Liked Songs', href: '/liked' },
  { icon: FiDownload, label: 'Downloads', href: '/downloads' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-secondary border-r border-accent/20 p-4 overflow-y-auto hidden md:flex flex-col">
      {/* Categories */}
      <div className="mb-8">
        <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-wider">Navigation</h3>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
                  isActive
                    ? 'bg-accent/20 text-accent border-l-2 border-accent'
                    : 'text-textMuted hover:text-text hover:bg-primary'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Malawi Music Categories */}
      <div className="mb-8">
        <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-wider">Categories</h3>
        <div className="space-y-2">
          {['Gospel', 'Hip-Hop', 'Reggae', 'Afrobeats', 'Traditional', 'R&B', 'Pop'].map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="flex items-center space-x-2 px-4 py-2 text-textMuted hover:text-accent transition rounded-lg hover:bg-primary"
            >
              <div className="w-2 h-2 rounded-full bg-accent" />
              <span>{category}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Playlists */}
      <div>
        <h3 className="text-accent font-bold mb-4 text-sm uppercase tracking-wider">My Playlists</h3>
        <div className="space-y-2">
          <button className="w-full text-left px-4 py-2 text-textMuted hover:text-accent transition rounded-lg hover:bg-primary">
            + Create Playlist
          </button>
        </div>
      </div>
    </aside>
  )
}
