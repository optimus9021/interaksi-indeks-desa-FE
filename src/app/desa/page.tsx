'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { getDesaList, type DesaData } from "@/data/indeksDesaDummy"
import { Search, Filter, Download, Eye, MapPin, TrendingUp, TrendingDown, Command } from "lucide-react"
import Link from "next/link"

export default function DaftarDesaPage() {
  const [loading, setLoading] = useState(true)
  const [desaList, setDesaList] = useState<DesaData[]>([])
  const [filteredDesa, setFilteredDesa] = useState<DesaData[]>([])
  const [localSearchTerm] = useState("")
  const [filterWilayah, setFilterWilayah] = useState("")
  const [sortBy, setSortBy] = useState<'nama' | 'indeks' | 'wilayah'>('indeks')
  const { isOpen: isSpotlightOpen, openSpotlight, closeSpotlight } = useSpotlight()

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      const data = getDesaList()
      setDesaList(data)
      setFilteredDesa(data)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    let filtered = desaList.filter(desa => 
      desa.nama.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      desa.kecamatan.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      desa.kabupaten.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
      desa.provinsi.toLowerCase().includes(localSearchTerm.toLowerCase())
    )

    if (filterWilayah) {
      filtered = filtered.filter(desa =>
        desa.provinsi.toLowerCase().includes(filterWilayah.toLowerCase())
      )
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'nama') return a.nama.localeCompare(b.nama)
      if (sortBy === 'indeks') return b.indeksTotal - a.indeksTotal
      if (sortBy === 'wilayah') return a.provinsi.localeCompare(b.provinsi)
      return 0
    })

    setFilteredDesa(filtered)
  }, [localSearchTerm, filterWilayah, sortBy, desaList])

  const getIndeksStatus = (indeks: number) => {
    if (indeks >= 85) return { text: 'Sangat Baik', color: 'text-green-600', bg: 'bg-green-50' }
    if (indeks >= 75) return { text: 'Baik', color: 'text-blue-600', bg: 'bg-blue-50' }
    if (indeks >= 65) return { text: 'Cukup', color: 'text-yellow-600', bg: 'bg-yellow-50' }
    return { text: 'Perlu Perhatian', color: 'text-red-600', bg: 'bg-red-50' }
  }

  const uniqueProvinsi = [...new Set(desaList.map(desa => desa.provinsi))]

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Daftar Desa
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Daftar lengkap desa dengan data Indeks Desa
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <div 
                  onClick={openSpotlight}
                  className="flex items-center pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <span className="text-gray-500 dark:text-gray-400 flex-1">Cari desa atau voice search...</span>
                  <div className="flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">
                      <Command className="h-3 w-3" />
                    </kbd>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-600 dark:text-gray-400">K</kbd>
                  </div>
                </div>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>

              {/* Filter Wilayah */}
              <select
                value={filterWilayah}
                onChange={(e) => setFilterWilayah(e.target.value)}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="">Semua Provinsi</option>
                {uniqueProvinsi.map(provinsi => (
                  <option key={provinsi} value={provinsi}>{provinsi}</option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'nama' | 'indeks' | 'wilayah')}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              >
                <option value="nama">Urutkan: Nama</option>
                <option value="indeks">Urutkan: Indeks Tertinggi</option>
                <option value="wilayah">Urutkan: Wilayah</option>
              </select>

              {/* Export Button */}
              <button className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <Download className="h-4 w-4" />
                Ekspor Data
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Menampilkan {filteredDesa.length} dari {desaList.length} desa
          </p>
        </div>

        {/* Desa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesa.map((desa) => {
            const status = getIndeksStatus(desa.indeksTotal)
            return (
              <Card key={desa.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{desa.nama}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="h-3 w-3" />
                        {desa.kecamatan}, {desa.kabupaten}
                      </CardDescription>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.color}`}>
                      {status.text}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Indeks Total */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Indeks Total
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                          {desa.indeksTotal.toFixed(1)}
                        </span>
                        {desa.indeksTotal >= 80 ? (
                          <TrendingUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </div>

                    {/* Dimensi Highlights */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Layanan Dasar</span>
                        <span className="font-medium">{desa.layananDasar.total.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Ekonomi</span>
                        <span className="font-medium">{desa.ekonomi.total.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Aksesibilitas</span>
                        <span className="font-medium">{desa.aksesibilitas.total.toFixed(1)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Tata Kelola</span>
                        <span className="font-medium">{desa.tataKelola.total.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Link
                        href={`/desa/${desa.id}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                      >
                        <Eye className="h-4 w-4" />
                        Detail
                      </Link>
                      <button className="px-3 py-2 text-sm font-medium text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* No Results */}
        {filteredDesa.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Tidak ada desa ditemukan</h3>
                <p className="text-sm">Coba ubah kata kunci pencarian atau filter yang digunakan</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Spotlight Search Modal */}
      <Spotlight 
        isOpen={isSpotlightOpen} 
        onClose={closeSpotlight} 
      />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-6 w-80" />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Skeleton className="h-8 w-24" />
                  <div className="grid grid-cols-2 gap-2">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-4" />
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="flex-1 h-9" />
                    <Skeleton className="h-9 w-12" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
