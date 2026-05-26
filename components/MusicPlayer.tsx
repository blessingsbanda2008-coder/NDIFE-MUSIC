'use client'

import { useState, useRef, useEffect } from 'react'
import { usePlayerStore } from '@/lib/store'
import { FiPlay, FiPause, FiSkipBack, FiSkipForward, FiVolume2, FiDownload } from 'react-icons/fi'
import { formatTime } from '@/lib/utils'

export default function MusicPlayer() {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    volume,
    setVolume,
    isMuted,
    setIsMuted,
    nextTrack,
    previousTrack,
  } = usePlayerStore()

  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
    }
  }

  if (!currentSong) return null

  return (
    <div className="bg-secondary border-t border-accent/20 p-4">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={nextTrack}
      />

      <div className="max-w-7xl mx-auto">
        {/* Song Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-12 h-12 rounded-lg bg-primary overflow-hidden">
              <img src={currentSong.coverUrl} alt={currentSong.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-semibold text-text truncate">{currentSong.title}</p>
              <p className="text-sm text-textMuted truncate">{currentSong.artist}</p>
            </div>
          </div>

          {/* Download Button */}
          <button className="p-2 hover:bg-primary rounded-lg transition text-accent">
            <FiDownload size={20} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-xs text-textMuted w-8">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="text-xs text-textMuted w-8 text-right">{formatTime(duration)}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={previousTrack}
            className="p-2 hover:bg-primary rounded-lg transition text-accent hover:scale-110"
          >
            <FiSkipBack size={20} />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-3 bg-accent text-dark rounded-full hover:bg-accentDark transition hover:scale-110"
          >
            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} className="ml-1" />}
          </button>

          <button
            onClick={nextTrack}
            className="p-2 hover:bg-primary rounded-lg transition text-accent hover:scale-110"
          >
            <FiSkipForward size={20} />
          </button>

          {/* Volume Control */}
          <div className="flex items-center space-x-2 ml-auto">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 hover:bg-primary rounded-lg transition text-accent"
            >
              <FiVolume2 size={20} />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value))
                if (parseFloat(e.target.value) > 0) setIsMuted(false)
              }}
              className="w-24 h-1 bg-primary rounded-lg appearance-none cursor-pointer accent-accent"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
