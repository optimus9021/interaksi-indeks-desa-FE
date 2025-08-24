'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Spotlight } from "@/components/spotlight"
import { useSpotlight } from "@/hooks/useSpotlight"
import { 
  Info, 
  Target, 
  BarChart3, 
  Users, 
  Building, 
  Leaf, 
  Car, 
  Settings,
  GraduationCap,
  CheckCircle
} from "lucide-react"

export default function TentangPage() {
  const { isOpen: isSpotlightOpen, closeSpotlight } = useSpotlight()
  
  const dimensiData = [
    {
      icon: GraduationCap,
      title: "Layanan Dasar",
      description: "Mengukur ketersediaan dan kualitas layanan pendidikan, kesehatan, dan utilitas dasar di desa.",
      subdimensi: ["Pendidikan", "Kesehatan", "Utilitas Dasar"],
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Users,
      title: "Sosial",
      description: "Menilai tingkat aktivitas dan ketersediaan fasilitas untuk kegiatan sosial masyarakat desa.",
      subdimensi: ["Aktivitas Sosial", "Fasilitas Masyarakat"],
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Building,
      title: "Ekonomi",
      description: "Menganalisis produksi ekonomi desa dan ketersediaan fasilitas pendukung kegiatan ekonomi.",
      subdimensi: ["Produksi Desa", "Fasilitas Pendukung Ekonomi"],
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      icon: Leaf,
      title: "Lingkungan",
      description: "Mengevaluasi pengelolaan lingkungan dan kesiapan dalam penanggulangan bencana alam.",
      subdimensi: ["Pengelolaan Lingkungan", "Penanggulangan Bencana"],
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20"
    },
    {
      icon: Car,
      title: "Aksesibilitas",
      description: "Mengukur kondisi akses jalan dan kemudahan akses transportasi menuju dan dari desa.",
      subdimensi: ["Kondisi Akses Jalan", "Kemudahan Akses"],
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-900/20"
    },
    {
      icon: Settings,
      title: "Tata Kelola Pemdes",
      description: "Menilai kualitas kelembagaan pemerintahan desa dan tata kelola keuangan desa.",
      subdimensi: ["Kelembagaan dan Pelayanan", "Tata Kelola Keuangan"],
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20"
    }
  ]

  const features = [
    {
      icon: BarChart3,
      title: "Visualisasi Interaktif",
      description: "Grafik dan chart yang responsif dengan teknologi ECharts untuk analisis data yang mendalam."
    },
    {
      icon: Target,
      title: "Monitoring Real-time",
      description: "Pemantauan data Indeks Desa secara berkelanjutan dengan update terkini."
    },
    {
      icon: Users,
      title: "User-Friendly Interface",
      description: "Antarmuka yang mudah digunakan dan responsive di semua perangkat."
    },
    {
      icon: CheckCircle,
      title: "Laporan Komprehensif",
      description: "Export data dan laporan dalam berbagai format untuk keperluan analisis lanjutan."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Tentang Dashboard Indeks Desa
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Sistem monitoring digital untuk memantau perkembangan dan kesejahteraan desa 
            di seluruh Indonesia berdasarkan 6 dimensi utama Indeks Desa.
          </p>
        </div>

        {/* What is Indeks Desa */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center gap-3 mb-4">
              <Info className="h-8 w-8 text-blue-600" />
              Apa itu Indeks Desa?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 text-center">
                Indeks Desa adalah indikator komposit yang digunakan untuk mengukur tingkat 
                perkembangan, kemandirian, dan kesejahteraan desa berdasarkan berbagai aspek 
                seperti ekonomi, sosial, infrastruktur, dan lingkungan.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Perkembangan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Mengukur kemajuan pembangunan infrastruktur dan fasilitas desa
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Kemandirian</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Menilai kemampuan desa dalam mengelola sumber daya dan potensi lokal
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold mb-2">Kesejahteraan</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Menganalisis tingkat kesejahteraan masyarakat desa secara komprehensif
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6 Dimensi */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              6 Dimensi Indeks Desa
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Indeks Desa dihitung berdasarkan 6 dimensi utama yang mencakup berbagai aspek kehidupan desa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dimensiData.map((dimensi, index) => {
              const Icon = dimensi.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className={`w-12 h-12 ${dimensi.bgColor} rounded-lg flex items-center justify-center mb-3`}>
                      <Icon className={`h-6 w-6 ${dimensi.color}`} />
                    </div>
                    <CardTitle className="text-lg">{dimensi.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {dimensi.description}
                    </CardDescription>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Sub-dimensi:</p>
                      <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        {dimensi.subdimensi.map((sub, subIndex) => (
                          <li key={subIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                            {sub}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Fitur Dashboard */}
        <Card className="mb-12">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl mb-4">Fitur Dashboard</CardTitle>
            <CardDescription className="text-lg">
              Dashboard ini menyediakan berbagai fitur untuk memudahkan monitoring dan analisis data Indeks Desa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Teknologi */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5 text-green-600" />
                Teknologi yang Digunakan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Frontend</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• Next.js 15 dengan TypeScript</li>
                    <li>• Tailwind CSS untuk styling</li>
                    <li>• React Hooks untuk state management</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Visualisasi</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    <li>• ECharts untuk grafik interaktif</li>
                    <li>• Responsive charts di semua device</li>
                    <li>• Dark/Light mode support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                Manfaat Dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Monitoring Terpusat</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Pantau semua desa dalam satu platform
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Analisis Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Visualisasi data untuk insight yang mudah dipahami
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Pengambilan Keputusan</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Data-driven decision making untuk pengembangan desa
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Laporan Komprehensif</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Export data untuk keperluan pelaporan dan analisis
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact/Footer Info */}
        <Card className="text-center">
          <CardContent className="py-8">
            <h3 className="text-xl font-semibold mb-4">Tentang Pengembang</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Dashboard ini dikembangkan untuk memfasilitasi monitoring dan analisis 
              Indeks Desa secara digital dan real-time.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Dikembangkan dengan teknologi modern untuk mendukung pembangunan desa yang berkelanjutan.
            </p>
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
