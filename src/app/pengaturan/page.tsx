'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { ThemeToggle } from "@/components/theme-toggle"
import { Settings, Type, Palette, Download, Save, RotateCcw } from "lucide-react"

export default function PengaturanPage() {
  const { isOpen: isSpotlightOpen, openSpotlight, closeSpotlight } = useSpotlight()
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [fontFamily, setFontFamily] = useState<'default' | 'serif' | 'mono'>('default')
  const [autoSave, setAutoSave] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'csv' | 'png'>('pdf')

  // Load saved settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboard-settings')
    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setFontSize(settings.fontSize || 'medium')
      setFontFamily(settings.fontFamily || 'default')
      setAutoSave(settings.autoSave !== undefined ? settings.autoSave : true)
      setNotifications(settings.notifications !== undefined ? settings.notifications : true)
      setExportFormat(settings.exportFormat || 'pdf')
    }
  }, [])

  // Apply font settings to document
  useEffect(() => {
    const root = document.documentElement
    
    // Remove existing classes
    root.classList.remove('text-sm', 'text-base', 'text-lg')
    root.classList.remove('font-serif', 'font-mono')
    
    // Apply font size
    if (fontSize === 'small') root.classList.add('text-sm')
    else if (fontSize === 'large') root.classList.add('text-lg')
    else root.classList.add('text-base')
    
    // Apply font family
    if (fontFamily === 'serif') root.classList.add('font-serif')
    else if (fontFamily === 'mono') root.classList.add('font-mono')
  }, [fontSize, fontFamily])

  const saveSettings = () => {
    const settings = {
      fontSize,
      fontFamily,
      autoSave,
      notifications,
      exportFormat
    }
    localStorage.setItem('dashboard-settings', JSON.stringify(settings))
    
    // Show success message (you could use a toast library here)
    alert('Pengaturan berhasil disimpan!')
  }

  const resetSettings = () => {
    setFontSize('medium')
    setFontFamily('default')
    setAutoSave(true)
    setNotifications(true)
    setExportFormat('pdf')
    localStorage.removeItem('dashboard-settings')
    
    // Reset document classes
    const root = document.documentElement
    root.classList.remove('text-sm', 'text-base', 'text-lg', 'font-serif', 'font-mono')
    root.classList.add('text-base')
    
    alert('Pengaturan berhasil direset!')
  }

  const fontSizeOptions = [
    { value: 'small', label: 'Kecil', description: 'Teks berukuran kecil untuk lebih banyak konten' },
    { value: 'medium', label: 'Sedang', description: 'Ukuran teks standar yang nyaman dibaca' },
    { value: 'large', label: 'Besar', description: 'Teks berukuran besar untuk kemudahan baca' }
  ]

  const fontFamilyOptions = [
    { value: 'default', label: 'Default', description: 'Font system default (Geist Sans)' },
    { value: 'serif', label: 'Serif', description: 'Font dengan garis-garis kecil (Times New Roman)' },
    { value: 'mono', label: 'Monospace', description: 'Font dengan lebar karakter sama (Courier)' }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Pengaturan Dashboard
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Sesuaikan tampilan dan preferensi dashboard sesuai kebutuhan Anda
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-purple-600" />
                Tampilan
              </CardTitle>
              <CardDescription>
                Atur tema dan mode tampilan dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mode Tema
                  </label>
                  <div className="flex items-center gap-4">
                    <ThemeToggle />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Toggle antara mode terang dan gelap
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Typography Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-blue-600" />
                Tipografi
              </CardTitle>
              <CardDescription>
                Sesuaikan ukuran dan jenis font untuk kenyamanan membaca
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Font Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Ukuran Font
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {fontSizeOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          fontSize === option.value
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fontSize"
                          value={option.value}
                          checked={fontSize === option.value}
                          onChange={(e) => setFontSize(e.target.value as 'small' | 'medium' | 'large')}
                          className="sr-only"
                        />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Font Family */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Jenis Font
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {fontFamilyOptions.map((option) => (
                      <label
                        key={option.value}
                        className={`relative flex cursor-pointer rounded-lg border p-4 hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          fontFamily === option.value
                            ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fontFamily"
                          value={option.value}
                          checked={fontFamily === option.value}
                          onChange={(e) => setFontFamily(e.target.value as 'default' | 'serif' | 'mono')}
                          className="sr-only"
                        />
                        <div>
                          <div className={`font-medium text-gray-900 dark:text-gray-100 ${
                            option.value === 'serif' ? 'font-serif' : 
                            option.value === 'mono' ? 'font-mono' : ''
                          }`}>
                            {option.label}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            {option.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-green-600" />
                Pengaturan Ekspor
              </CardTitle>
              <CardDescription>
                Atur format default untuk ekspor data dan laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Format Ekspor Default
                  </label>
                  <select
                    value={exportFormat}
                    onChange={(e) => setExportFormat(e.target.value as 'pdf' | 'csv' | 'png')}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
                  >
                    <option value="pdf">PDF - Untuk laporan lengkap</option>
                    <option value="csv">CSV - Untuk data tabuler</option>
                    <option value="png">PNG - Untuk grafik/chart</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Pengaturan Umum
              </CardTitle>
              <CardDescription>
                Pengaturan fungsionalitas dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Auto Save Pengaturan
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Simpan pengaturan secara otomatis
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoSave}
                      onChange={(e) => setAutoSave(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Notifikasi Update
                    </label>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Tampilkan notifikasi saat ada update data
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={saveSettings}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4" />
              Simpan Pengaturan
            </button>
            
            <button
              onClick={resetSettings}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reset ke Default
            </button>
          </div>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Lihat bagaimana pengaturan font akan terlihat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800">
                <h3 className="text-xl font-bold mb-2">Dashboard Indeks Desa</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Ini adalah contoh teks dengan pengaturan font yang Anda pilih. 
                  Anda dapat melihat bagaimana ukuran dan jenis font mempengaruhi keterbacaan.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Indeks Total:</span>
                    <span className="ml-2">85.2</span>
                  </div>
                  <div>
                    <span className="font-medium">Status:</span>
                    <span className="ml-2">Sangat Baik</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Spotlight Search Modal */}
      <Spotlight 
        isOpen={isSpotlightOpen} 
        onClose={closeSpotlight} 
      />
    </div>
  )
}
