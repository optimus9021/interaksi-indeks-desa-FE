'use client'

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { DimensionChart } from "@/components/charts/DimensionChart"
import { getDesaById, type DesaData } from "@/data/indeksDesaDummy"
import { 
  MapPin, 
  ArrowLeft, 
  Download, 
  Share2, 
  TrendingUp, 
  Users, 
  Building, 
  Leaf, 
  Car, 
  Settings,
  GraduationCap,
  Heart,
  Zap
} from "lucide-react"
import Link from "next/link"

export default function DetailDesaPage() {
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [desa, setDesa] = useState<DesaData | null>(null)
  const { isOpen: isSpotlightOpen, openSpotlight, closeSpotlight } = useSpotlight()

  useEffect(() => {
    const timer = setTimeout(() => {
      const desaData = getDesaById(params.id as string)
      setDesa(desaData || null)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!desa) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500 dark:text-gray-400">
                <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">Desa tidak ditemukan</h3>
                <p className="text-sm mb-4">Desa dengan ID tersebut tidak ada dalam database</p>
                <Link
                  href="/desa"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Daftar Desa
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const getIndeksStatus = (indeks: number) => {
    if (indeks >= 85) return { text: 'Sangat Baik', color: 'text-green-600', bg: 'bg-green-50 dark:bg-green-900/20', border: 'border-green-200 dark:border-green-800' }
    if (indeks >= 75) return { text: 'Baik', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-900/20', border: 'border-blue-200 dark:border-blue-800' }
    if (indeks >= 65) return { text: 'Cukup', color: 'text-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20', border: 'border-yellow-200 dark:border-yellow-800' }
    return { text: 'Perlu Perhatian', color: 'text-red-600', bg: 'bg-red-50 dark:bg-red-900/20', border: 'border-red-200 dark:border-red-800' }
  }

  const status = getIndeksStatus(desa.indeksTotal)

  const dimensionData = {
    layananDasar: desa.layananDasar.total,
    sosial: desa.sosial.total,
    ekonomi: desa.ekonomi.total,
    lingkungan: desa.lingkungan.total,
    aksesibilitas: desa.aksesibilitas.total,
    tataKelola: desa.tataKelola.total
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/desa"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Desa
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {desa.nama}
              </h1>
              <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{desa.kecamatan}, {desa.kabupaten}, {desa.provinsi}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded-lg border ${status.bg} ${status.color} ${status.border}`}>
                <span className="font-medium">{status.text}</span>
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                <Share2 className="h-4 w-4" />
                Bagikan
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Download className="h-4 w-4" />
                Ekspor
              </button>
            </div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="lg:col-span-1 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-lg">Indeks Total</span>
                <TrendingUp className="h-5 w-5" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">{desa.indeksTotal.toFixed(1)}</div>
              <p className="text-blue-100 text-sm">Dari 100 poin maksimal</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Dimensi Terbaik
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-purple-600 mb-1">
                {Math.max(
                  desa.layananDasar.total,
                  desa.sosial.total,
                  desa.ekonomi.total,
                  desa.lingkungan.total,
                  desa.aksesibilitas.total,
                  desa.tataKelola.total
                ).toFixed(1)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {desa.aksesibilitas.total === Math.max(desa.layananDasar.total, desa.sosial.total, desa.ekonomi.total, desa.lingkungan.total, desa.aksesibilitas.total, desa.tataKelola.total) ? 'Aksesibilitas' :
                 desa.tataKelola.total === Math.max(desa.layananDasar.total, desa.sosial.total, desa.ekonomi.total, desa.lingkungan.total, desa.aksesibilitas.total, desa.tataKelola.total) ? 'Tata Kelola' :
                 desa.layananDasar.total === Math.max(desa.layananDasar.total, desa.sosial.total, desa.ekonomi.total, desa.lingkungan.total, desa.aksesibilitas.total, desa.tataKelola.total) ? 'Layanan Dasar' :
                 desa.sosial.total === Math.max(desa.layananDasar.total, desa.sosial.total, desa.ekonomi.total, desa.lingkungan.total, desa.aksesibilitas.total, desa.tataKelola.total) ? 'Sosial' :
                 desa.ekonomi.total === Math.max(desa.layananDasar.total, desa.sosial.total, desa.ekonomi.total, desa.lingkungan.total, desa.aksesibilitas.total, desa.tataKelola.total) ? 'Ekonomi' : 'Lingkungan'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Building className="h-4 w-4 text-green-600" />
                Tahun Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-green-600 mb-1">{desa.tahun}</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Data terkini</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Settings className="h-4 w-4 text-orange-600" />
                Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold text-orange-600 mb-1">Aktif</div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monitoring berlanjut</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Analisis Dimensi</CardTitle>
              <CardDescription>
                Visualisasi radar untuk semua dimensi Indeks Desa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DimensionChart 
                data={dimensionData} 
                height={400}
                title=""
              />
            </CardContent>
          </Card>

          {/* Detailed Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Rincian Skor Dimensi</CardTitle>
              <CardDescription>
                Breakdown detail untuk setiap dimensi dan sub-dimensi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Layanan Dasar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">Layanan Dasar</span>
                    </div>
                    <span className="font-bold text-blue-600">{desa.layananDasar.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Pendidikan</span>
                      <span>{desa.layananDasar.pendidikan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kesehatan</span>
                      <span>{desa.layananDasar.kesehatan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilitas Dasar</span>
                      <span>{desa.layananDasar.utilitasDasar}</span>
                    </div>
                  </div>
                </div>

                {/* Sosial */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-medium">Sosial</span>
                    </div>
                    <span className="font-bold text-purple-600">{desa.sosial.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Aktivitas</span>
                      <span>{desa.sosial.aktivitas}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fasilitas Masyarakat</span>
                      <span>{desa.sosial.fasilitasMasyarakat}</span>
                    </div>
                  </div>
                </div>

                {/* Ekonomi */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-green-600" />
                      <span className="font-medium">Ekonomi</span>
                    </div>
                    <span className="font-bold text-green-600">{desa.ekonomi.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Produksi Desa</span>
                      <span>{desa.ekonomi.produksiDesa}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fasilitas Pendukung</span>
                      <span>{desa.ekonomi.fasilitasPendukung}</span>
                    </div>
                  </div>
                </div>

                {/* Lingkungan */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-emerald-600" />
                      <span className="font-medium">Lingkungan</span>
                    </div>
                    <span className="font-bold text-emerald-600">{desa.lingkungan.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Pengelolaan Lingkungan</span>
                      <span>{desa.lingkungan.pengelolaanLingkungan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Penanggulangan Bencana</span>
                      <span>{desa.lingkungan.penanggulanganBencana}</span>
                    </div>
                  </div>
                </div>

                {/* Aksesibilitas */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-indigo-600" />
                      <span className="font-medium">Aksesibilitas</span>
                    </div>
                    <span className="font-bold text-indigo-600">{desa.aksesibilitas.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Kondisi Akses Jalan</span>
                      <span>{desa.aksesibilitas.kondisiAksesJalan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Kemudahan Akses</span>
                      <span>{desa.aksesibilitas.kemudahanAkses}</span>
                    </div>
                  </div>
                </div>

                {/* Tata Kelola */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Settings className="h-4 w-4 text-orange-600" />
                      <span className="font-medium">Tata Kelola Pemdes</span>
                    </div>
                    <span className="font-bold text-orange-600">{desa.tataKelola.total.toFixed(1)}</span>
                  </div>
                  <div className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex justify-between">
                      <span>Kelembagaan</span>
                      <span>{desa.tataKelola.kelembagaan}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tata Kelola Keuangan</span>
                      <span>{desa.tataKelola.tataKelolaKeuangan}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              Rekomendasi Pengembangan
            </CardTitle>
            <CardDescription>
              Saran untuk meningkatkan Indeks Desa berdasarkan analisis data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Kekuatan</h4>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• Aksesibilitas yang sangat baik</li>
                  <li>• Tata kelola pemerintahan yang efektif</li>
                  <li>• Infrastruktur layanan dasar memadai</li>
                </ul>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">Area Pengembangan</h4>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Peningkatan program lingkungan</li>
                  <li>• Diversifikasi ekonomi desa</li>
                  <li>• Penguatan aktivitas sosial masyarakat</li>
                </ul>
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

function LoadingSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Skeleton className="h-4 w-32" />
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-5 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
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
                <Skeleton className="h-96 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
