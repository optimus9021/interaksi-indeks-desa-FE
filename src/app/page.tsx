"use client"

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { TrendChart } from "@/components/charts/TrendChart"
import { DimensionChart } from "@/components/charts/DimensionChart"
import { ComparisonChart } from "@/components/charts/ComparisonChart"
import { getDesaList, getTrendData, getRataRataDimensi } from "@/data/indeksDesaDummy"
import { BarChart3, TrendingUp, Users, MapPin, Eye, Download } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useState, useEffect } from "react"

export default function HomePage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)
  const { isOpen: isSpotlightOpen, openSpotlight, closeSpotlight } = useSpotlight()

  useEffect(() => {
    // Simulasi loading
    const timer = setTimeout(() => {
      const desaList = getDesaList()
      const trendData = getTrendData()
      const rataRataDimensi = getRataRataDimensi()
      
      setData({
        desaList,
        trendData,
        rataRataDimensi,
        totalDesa: desaList.length,
        rataRataIndeks: desaList.reduce((sum: number, desa: any) => sum + desa.indeksTotal, 0) / desaList.length,
        desaTertinggi: desaList.reduce((max: any, desa: any) => desa.indeksTotal > max.indeksTotal ? desa : max),
        desaTerendah: desaList.reduce((min: any, desa: any) => desa.indeksTotal < min.indeksTotal ? desa : min)
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Dashboard Monitoring Indeks Desa
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Memantau perkembangan dan kesejahteraan desa di seluruh Indonesia
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Desa</CardTitle>
              <MapPin className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.totalDesa}</div>
              <p className="text-xs text-blue-100">Desa terpantau</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indeks Rata-rata</CardTitle>
              <BarChart3 className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.rataRataIndeks.toFixed(1)}</div>
              <p className="text-xs text-green-100">Dari 100 poin maksimal</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Desa Tertinggi</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.desaTertinggi.indeksTotal.toFixed(1)}</div>
              <p className="text-xs text-yellow-100">{data.desaTertinggi.nama}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perlu Perhatian</CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.desaTerendah.indeksTotal.toFixed(1)}</div>
              <p className="text-xs text-purple-100">{data.desaTerendah.nama}</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Tren Perkembangan
              </CardTitle>
              <CardDescription>
                Perkembangan rata-rata Indeks Desa dalam 5 tahun terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={data.trendData} height={300} />
            </CardContent>
          </Card>

          {/* Dimension Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-green-600" />
                Analisis Dimensi
              </CardTitle>
              <CardDescription>
                Rata-rata skor untuk setiap dimensi Indeks Desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DimensionChart data={data.rataRataDimensi} height={350} />
            </CardContent>
          </Card>
        </div>

        {/* Comparison Chart */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  Perbandingan Antar Desa
                </CardTitle>
                <CardDescription>
                  Perbandingan indeks total untuk semua desa yang terpantau
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                  <Eye className="h-4 w-4" />
                  Detail
                </button>
                <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <Download className="h-4 w-4" />
                  Ekspor
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ComparisonChart data={data.desaList} height={400} />
          </CardContent>
        </Card>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dimensi Terbaik</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Aksesibilitas</span>
                  <span className="font-semibold text-green-600">{data.rataRataDimensi.aksesibilitas.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Tata Kelola</span>
                  <span className="font-semibold text-green-600">{data.rataRataDimensi.tataKelola.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Perlu Peningkatan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Lingkungan</span>
                  <span className="font-semibold text-yellow-600">{data.rataRataDimensi.lingkungan.toFixed(1)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Ekonomi</span>
                  <span className="font-semibold text-yellow-600">{data.rataRataDimensi.ekonomi.toFixed(1)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Update Terakhir</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Data terakhir diperbarui pada{" "}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {new Date().toLocaleDateString('id-ID', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Tahun data: 2024
              </p>
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

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-8 w-96 mb-2" />
          <Skeleton className="h-6 w-80" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-60" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-80 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
