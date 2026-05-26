'use client'

import { useState, useEffect } from 'react'
import Layout from '@/components/Layout'
import SongCard from '@/components/SongCard'
import ArtistCard from '@/components/ArtistCard'
import { usePlayerStore } from '@/lib/store'
import { Song, Artist } from '@/lib/store'
import Link from 'next/link'

// Mock data - replace with actual API calls
const mockSongs: Song[] = [
  {
    id: '1',
    title: 'Ndifeyo',
    artist: 'Lawi Music',
    artistId: 'artist-1',
    duration: 240,
    plays: 15000,
    likes: 2500,
    coverUrl: 'https://via.placeholder.com/300x300?text=Ndifeyo',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    category: 'afrobeats',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Malawi Vibes',
    artist: 'DJ Tamasha',
    artistId: 'artist-2',
    duration: 210,
    plays: 12000,
    likes: 1800,
    coverUrl: 'https://via.placeholder.com/300x300?text=Malawi+Vibes',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    category: 'reggae',
    createdAt: new Date().toISOString(),
  },
]

const mockArtists: Artist[] = [
  {
    id: 'artist-1',
    name: 'Lawi Music',
    bio: 'Award-winning Malawi artist',
    imageUrl: 'https://via.placeholder.com/300x300?text=Lawi+Music',
    totalSongs: 25,
  },
  {
    id: 'artist-2',
    name: 'DJ Tamasha',
    bio: 'Electronic music producer',
    imageUrl: 'https://via.placeholder.com/300x300?text=DJ+Tamasha',
    totalSongs: 18,
  },
]

export default function Home() {
  const { setCurrentSong, setQueue } = usePlayerStore()
  const [featuredSongs, setFeaturedSongs] = useState<Song[]>([])
  const [trendingSongs, setTrendingSongs] = useState<Song[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedSongs(mockSongs.slice(0, 4))
      setTrendingSongs(mockSongs.sort((a, b) => b.plays - a.plays))
      setLoading(false)
    }, 500)
  }, [])

  const handlePlaySong = (song: Song) => {
    setCurrentSong(song)
    setQueue(mockSongs)
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/10 via-dark to-dark py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-accent mb-4">
              NDIFE MUSIC
            </h1>
            <p className="text-xl text-textMuted mb-8">
              Stream and discover the best Malawi music
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/browse"
                className="px-8 py-3 bg-accent text-dark rounded-lg font-bold hover:bg-accentDark transition"
              >
                Explore Music
              </Link>
              <Link
                href="/artists"
                className="px-8 py-3 border border-accent text-accent rounded-lg font-bold hover:bg-accent/10 transition"
              >
                Discover Artists
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Songs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-accent">Featured Songs</h2>
            <Link href="/browse" className="text-accent hover:underline">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="skeleton rounded-lg aspect-square" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredSongs.map((song) => (
                <SongCard
                  key={song.id}
                  song={song}
                  onPlay={handlePlaySong}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Trending Songs */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-accent">Trending Now</h2>
            <Link href="/trending" className="text-accent hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onPlay={handlePlaySong}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-accent">Featured Artists</h2>
            <Link href="/artists" className="text-accent hover:underline">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockArtists.map((artist) => (
              <ArtistCard key={artist.id} artist={artist} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-accent mb-8">Explore by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {['Gospel', 'Hip-Hop', 'Reggae', 'Afrobeats', 'Traditional', 'R&B', 'Pop'].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="p-4 bg-primary border border-accent/20 rounded-lg hover:border-accent hover:bg-accent/10 transition text-center font-semibold text-accent"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
