'use client'

import { useState, useEffect } from "react"

export function useSpotlight() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Cmd+K on Mac, Ctrl+K on Windows/Linux
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        setIsOpen(true)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const openSpotlight = () => setIsOpen(true)
  const closeSpotlight = () => setIsOpen(false)

  return {
    isOpen,
    openSpotlight,
    closeSpotlight
  }
}
