'use client'

import { useState } from 'react'
import Layout from '@/components/Layout'
import { FiUpload, FiTrash2, FiEdit } from 'react-icons/fi'
import toast from 'react-hot-toast'

interface UploadedSong {
  id: string
  title: string
  artist: string
  size: string
  uploadedAt: string
}

const mockUploads: UploadedSong[] = [
  {
    id: '1',
    title: 'New Song',
    artist: 'Lawi Music',
    size: '4.2MB',
    uploadedAt: '2 hours ago',
  },
]

export default function AdminDashboard() {
  const [songs, setSongs] = useState<UploadedSong[]>(mockUploads)
  const [isUploading, setIsUploading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    category: 'afrobeats',
  })

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUploading(true)
    
    try {
      // Simulate upload
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast.success('Song uploaded successfully!')
      setFormData({ title: '', artist: '', category: 'afrobeats' })
    } catch (error) {
      toast.error('Failed to upload song')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = (id: string) => {
    setSongs(songs.filter(s => s.id !== id))
    toast.success('Song deleted')
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold text-accent mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Form */}
          <div className="lg:col-span-1">
            <div className="bg-secondary p-6 rounded-lg border border-accent/20">
              <h2 className="text-xl font-bold text-accent mb-4 flex items-center space-x-2">
                <FiUpload /> Upload Song
              </h2>

              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Song Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="Enter song title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Artist Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.artist}
                    onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-text focus:outline-none focus:border-accent"
                    placeholder="Enter artist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-text focus:outline-none focus:border-accent"
                  >
                    <option value="gospel">Gospel</option>
                    <option value="hiphop">Hip-Hop</option>
                    <option value="reggae">Reggae</option>
                    <option value="afrobeats">Afrobeats</option>
                    <option value="traditional">Traditional</option>
                    <option value="rnb">R&B</option>
                    <option value="pop">Pop</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">MP3 File *</label>
                  <input
                    type="file"
                    accept=".mp3"
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-text focus:outline-none focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-dark hover:file:bg-accentDark"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Cover Image *</label>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    className="w-full px-4 py-2 bg-primary border border-accent/30 rounded-lg text-text focus:outline-none focus:border-accent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-dark hover:file:bg-accentDark"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="w-full py-2 bg-accent text-dark font-bold rounded-lg hover:bg-accentDark transition disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload Song'}
                </button>
              </form>
            </div>
          </div>

          {/* Uploaded Songs List */}
          <div className="lg:col-span-2">
            <div className="bg-secondary p-6 rounded-lg border border-accent/20">
              <h2 className="text-xl font-bold text-accent mb-4">Uploaded Songs</h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-accent/20">
                      <th className="text-left py-3 px-4 font-semibold text-textMuted">Title</th>
                      <th className="text-left py-3 px-4 font-semibold text-textMuted">Artist</th>
                      <th className="text-left py-3 px-4 font-semibold text-textMuted">Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-textMuted">Uploaded</th>
                      <th className="text-right py-3 px-4 font-semibold text-textMuted">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.map((song) => (
                      <tr key={song.id} className="border-b border-accent/20 hover:bg-primary transition">
                        <td className="py-3 px-4">{song.title}</td>
                        <td className="py-3 px-4 text-textMuted">{song.artist}</td>
                        <td className="py-3 px-4 text-textMuted">{song.size}</td>
                        <td className="py-3 px-4 text-textMuted text-sm">{song.uploadedAt}</td>
                        <td className="py-3 px-4 text-right">
                          <button className="p-2 hover:bg-secondary rounded transition text-accent mr-2">
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(song.id)}
                            className="p-2 hover:bg-secondary rounded transition text-red-400"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
