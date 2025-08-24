'use client'

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { TrendChart } from "@/components/charts/TrendChart"
import { DimensionChart } from "@/components/charts/DimensionChart"
import { ComparisonChart } from "@/components/charts/ComparisonChart"
import { getDesaList, getTrendData, getRataRataDimensi, type DesaData } from "@/data/indeksDesaDummy"
import { 
  BarChart3, 
  TrendingUp, 
  Target,
  Award,
  AlertTriangle,
  Filter,
  Download,
  MapPin,
  Users,
  Activity,
  PieChart
} from "lucide-react"

interface AnalysisData {
  trendData: { tahun: number; indeksRataRata: number }[]
  dimensionData: {
    [key: string]: number
    layananDasar: number
    sosial: number
    ekonomi: number
    lingkungan: number
    aksesibilitas: number
    tataKelola: number
  }
  desaList: DesaData[]
  topPerformers: DesaData[]
  needsAttention: DesaData[]
  yearOverYearChange: number
  bestDimension: string
  worstDimension: string
}

export default function AnalisisPage() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<AnalysisData | null>(null)
  const { isOpen: isSpotlightOpen, closeSpotlight } = useSpotlight()

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      const desaList = getDesaList()
      const trendData = getTrendData()
      const dimensionData = getRataRataDimensi()
      
      // Analisis top performers (skor > 85)
      const topPerformers = desaList.filter(desa => desa.indeksTotal > 85).slice(0, 3)
      
      // Analisis desa yang perlu perhatian (skor < 70)
      const needsAttention = desaList.filter(desa => desa.indeksTotal < 70).slice(0, 3)
      
      // Year over year change (simulasi)
      const currentYear = trendData[trendData.length - 1]?.indeksRataRata || 0
      const previousYear = trendData[trendData.length - 2]?.indeksRataRata || 0
      const yearOverYearChange = ((currentYear - previousYear) / previousYear) * 100
      
      // Best and worst dimensions
      const dimensionScores = Object.entries(dimensionData).map(([key, value]) => ({
        dimension: key,
        score: value as number
      }))
      const bestDimension = dimensionScores.reduce((max, curr) => curr.score > max.score ? curr : max).dimension
      const worstDimension = dimensionScores.reduce((min, curr) => curr.score < min.score ? curr : min).dimension
      
      setData({
        trendData,
        dimensionData,
        desaList,
        topPerformers,
        needsAttention,
        yearOverYearChange,
        bestDimension,
        worstDimension
      })
      setLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  )

  if (loading) return <LoadingSkeleton />

  if (!data) return <div>Error loading data</div>

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Analisis Data Indeks Desa
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Analisis mendalam tentang perkembangan dan performa desa di Indonesia
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
              <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perubahan Tahunan</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.yearOverYearChange > 0 ? '+' : ''}{data.yearOverYearChange.toFixed(1)}%
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                dari tahun sebelumnya
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dimensi Terbaik</CardTitle>
              <Award className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {data.bestDimension}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                skor: {data.dimensionData[data.bestDimension]?.toFixed(1)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Perlu Perhatian</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {data.needsAttention.length}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                desa dengan skor rendah
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
              <Target className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {data.topPerformers.length}
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                desa berprestasi tinggi
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2 text-blue-600" />
                Tren Perkembangan Indeks
              </CardTitle>
              <CardDescription>
                Perkembangan rata-rata indeks desa dari tahun ke tahun
              </CardDescription>
            </CardHeader>
            <CardContent>
              <TrendChart data={data.trendData} height={300} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2 text-green-600" />
                Analisis Dimensi
              </CardTitle>
              <CardDescription>
                Performa rata-rata setiap dimensi pembangunan desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DimensionChart data={data.dimensionData} height={300} />
            </CardContent>
          </Card>
        </div>

        {/* Village Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-purple-600" />
              Perbandingan Antar Desa
            </CardTitle>
            <CardDescription>
              Perbandingan indeks total semua desa yang terdaftar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ComparisonChart data={data.desaList} height={400} />
          </CardContent>
        </Card>

        {/* Top Performers & Need Attention */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <Award className="h-5 w-5 mr-2" />
                Desa Berprestasi Tinggi
              </CardTitle>
              <CardDescription>
                Desa dengan indeks tertinggi (skor {'>'}85)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.topPerformers.map((desa, index) => (
                <div key={desa.id} className="flex items-center justify-between p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {desa.nama}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {desa.provinsi}, {desa.kabupaten}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">
                      {desa.indeksTotal.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Indeks Total
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Need Attention */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Desa Perlu Perhatian
              </CardTitle>
              <CardDescription>
                Desa dengan indeks rendah yang membutuhkan bantuan (skor {'<'}70)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.needsAttention.map((desa) => (
                <div key={desa.id} className="flex items-center justify-between p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        !
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {desa.nama}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {desa.provinsi}, {desa.kabupaten}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      {desa.indeksTotal.toFixed(1)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Indeks Total
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Insights & Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-indigo-600" />
              Insight & Rekomendasi
            </CardTitle>
            <CardDescription>
              Analisis dan saran berdasarkan data yang tersedia
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/10">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  📈 Tren Positif
                </h4>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Indeks rata-rata desa mengalami peningkatan {Math.abs(data.yearOverYearChange).toFixed(1)}% 
                  dari tahun sebelumnya. Ini menunjukkan adanya perbaikan dalam pembangunan desa secara keseluruhan.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/10">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  🏆 Dimensi Unggul
                </h4>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Dimensi {data.bestDimension} menunjukkan performa terbaik dengan skor {data.dimensionData[data.bestDimension]?.toFixed(1)}. 
                  Ini dapat dijadikan contoh untuk dimensi lainnya.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-orange-50 dark:bg-orange-900/10">
                <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  ⚠️ Perlu Perbaikan
                </h4>
                <p className="text-sm text-orange-800 dark:text-orange-200">
                  Dimensi {data.worstDimension} masih memerlukan perhatian khusus dengan skor {data.dimensionData[data.worstDimension]?.toFixed(1)}. 
                  Perlu strategi khusus untuk meningkatkan aspek ini.
                </p>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/10">
                <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  🎯 Rekomendasi
                </h4>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Fokuskan program bantuan pada {data.needsAttention.length} desa yang memerlukan perhatian khusus. 
                  Terapkan best practices dari desa berprestasi tinggi.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Spotlight Search Modal */}
      <Spotlight 
        isOpen={isSpotlightOpen} 
        onClose={closeSpotlight} 
      />
    </div>
  )
}
