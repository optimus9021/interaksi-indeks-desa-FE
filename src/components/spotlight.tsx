'use client'

import { useState, useEffect, useRef } from "react"
import { Search, Command, Mic, MicOff, X, ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  isOpen: boolean
  onClose: () => void
  placeholder?: string
  onSearch?: (query: string) => void
}

export function Spotlight({ isOpen, onClose, placeholder = "Cari data desa...", onSearch }: SpotlightProps) {
  const [query, setQuery] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Mock search results
  const [results, setResults] = useState<any[]>([])
  
  const mockResults = [
    { id: 1, type: "desa", title: "Desa Cinta Damai", subtitle: "Kalimantan Utara • Indeks: 88.7", icon: "🏘️" },
    { id: 2, type: "desa", title: "Desa Harapan Baru", subtitle: "Jawa Barat • Indeks: 73.2", icon: "🏘️" },
    { id: 3, type: "analisis", title: "Analisis Dimensi Layanan Dasar", subtitle: "Laporan terbaru", icon: "📊" },
    { id: 4, type: "filter", title: "Filter berdasarkan skor tinggi", subtitle: "Desa dengan indeks > 85", icon: "🔍" },
    { id: 5, type: "export", title: "Export data ke PDF", subtitle: "Download laporan lengkap", icon: "📄" },
  ]

  // Handle search input
  useEffect(() => {
    if (query.trim()) {
      const filtered = mockResults.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
      setSelectedIndex(0)
    } else {
      setResults([])
      setSelectedIndex(-1)
    }
  }, [query])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          )
          break
        case 'Enter':
          e.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleSelectResult(results[selectedIndex])
          } else if (query.trim()) {
            onSearch?.(query)
            onClose()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, query, onSearch, onClose])

  const handleSelectResult = (result: any) => {
    console.log('Selected:', result)
    setQuery("")
    setResults([])
    onClose()
  }

  const startVoiceSearch = () => {
    setIsListening(true)
    // Mock voice recognition - akan diganti dengan real implementation
    setTimeout(() => {
      setQuery("Desa dengan indeks tertinggi")
      setIsListening(false)
    }, 2000)
  }

  const stopVoiceSearch = () => {
    setIsListening(false)
  }

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 animate-in fade-in-0 duration-200"
        onClick={onClose}
      />
      
      {/* Spotlight Modal */}
      <div className="fixed left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl z-50 animate-in zoom-in-95 fade-in-0 slide-in-from-bottom-2 duration-200">
        <div className="mx-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            
            {/* Search Input */}
            <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="flex-1 text-lg bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500"
              />
              
              {/* Voice Search Button */}
              <button
                onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                className={cn(
                  "p-2 rounded-lg transition-colors ml-2",
                  isListening 
                    ? "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-400" 
                    : "text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                )}
              >
                {isListening ? (
                  <MicOff className="h-4 w-4" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </button>
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-gray-300 ml-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Voice Listening Indicator */}
            {isListening && (
              <div className="px-4 py-3 bg-red-50 dark:bg-red-900/10 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center text-red-600 dark:text-red-400">
                  <div className="flex space-x-1 mr-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <span className="text-sm font-medium">Mendengarkan...</span>
                </div>
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 && (
              <div className="max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelectResult(result)}
                    className={cn(
                      "w-full flex items-center p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                      index === selectedIndex && "bg-blue-50 dark:bg-blue-900/20"
                    )}
                  >
                    <span className="text-2xl mr-4">{result.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                        {result.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {result.subtitle}
                      </div>
                    </div>
                    {index === selectedIndex && (
                      <ArrowUp className="h-4 w-4 text-gray-400 rotate-90" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {query && results.length === 0 && (
              <div className="p-8 text-center">
                <Search className="h-8 w-8 text-gray-400 mx-auto mb-3" />
                <div className="text-gray-500 dark:text-gray-400">
                  Tidak ada hasil untuk "{query}"
                </div>
                <div className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                  Coba kata kunci lain atau gunakan voice search
                </div>
              </div>
            )}

            {/* Quick Actions */}
            {!query && (
              <div className="p-4">
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Quick Actions
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    onClick={() => setQuery("desa dengan indeks tertinggi")}
                    className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg mr-3">🏆</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Desa Terbaik</span>
                  </button>
                  <button 
                    onClick={() => setQuery("analisis dimensi")}
                    className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg mr-3">📊</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Analisis</span>
                  </button>
                  <button 
                    onClick={() => setQuery("export laporan")}
                    className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg mr-3">📄</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Export</span>
                  </button>
                  <button 
                    onClick={() => setQuery("bantuan")}
                    className="flex items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <span className="text-lg mr-3">❓</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Bantuan</span>
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" />
                    <ArrowDown className="h-3 w-3 mr-1" />
                    <span>navigasi</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd>
                    <span className="ml-1">pilih</span>
                  </div>
                  <div className="flex items-center">
                    <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Esc</kbd>
                    <span className="ml-1">tutup</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mic className="h-3 w-3 mr-1" />
                  <span>Voice Search</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
