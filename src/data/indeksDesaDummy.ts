// Data dummy untuk Indeks Desa

export interface DesaData {
  id: string;
  nama: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  tahun: number;
  indeksTotal: number;
  layananDasar: {
    pendidikan: number;
    kesehatan: number;
    utilitasDasar: number;
    total: number;
  };
  sosial: {
    aktivitas: number;
    fasilitasMasyarakat: number;
    total: number;
  };
  ekonomi: {
    produksiDesa: number;
    fasilitasPendukung: number;
    total: number;
  };
  lingkungan: {
    pengelolaanLingkungan: number;
    penanggulanganBencana: number;
    total: number;
  };
  aksesibilitas: {
    kondisiAksesJalan: number;
    kemudahanAkses: number;
    total: number;
  };
  tataKelola: {
    kelembagaan: number;
    tataKelolaKeuangan: number;
    total: number;
  };
}

export const desaData: DesaData[] = [
  {
    id: "1",
    nama: "Desa Suka Maju",
    kecamatan: "Kecamatan Makmur",
    kabupaten: "Kabupaten Sejahtera",
    provinsi: "Jawa Tengah",
    tahun: 2024,
    indeksTotal: 85.2,
    layananDasar: {
      pendidikan: 88,
      kesehatan: 82,
      utilitasDasar: 86,
      total: 85.3
    },
    sosial: {
      aktivitas: 79,
      fasilitasMasyarakat: 83,
      total: 81.0
    },
    ekonomi: {
      produksiDesa: 87,
      fasilitasPendukung: 82,
      total: 84.5
    },
    lingkungan: {
      pengelolaanLingkungan: 78,
      penanggulanganBencana: 85,
      total: 81.5
    },
    aksesibilitas: {
      kondisiAksesJalan: 92,
      kemudahanAkses: 89,
      total: 90.5
    },
    tataKelola: {
      kelembagaan: 86,
      tataKelolaKeuangan: 88,
      total: 87.0
    }
  },
  {
    id: "2",
    nama: "Desa Makmur Jaya",
    kecamatan: "Kecamatan Berkah",
    kabupaten: "Kabupaten Sejahtera",
    provinsi: "Jawa Tengah",
    tahun: 2024,
    indeksTotal: 78.5,
    layananDasar: {
      pendidikan: 75,
      kesehatan: 80,
      utilitasDasar: 77,
      total: 77.3
    },
    sosial: {
      aktivitas: 82,
      fasilitasMasyarakat: 79,
      total: 80.5
    },
    ekonomi: {
      produksiDesa: 76,
      fasilitasPendukung: 78,
      total: 77.0
    },
    lingkungan: {
      pengelolaanLingkungan: 74,
      penanggulanganBencana: 82,
      total: 78.0
    },
    aksesibilitas: {
      kondisiAksesJalan: 85,
      kemudahanAkses: 81,
      total: 83.0
    },
    tataKelola: {
      kelembagaan: 79,
      tataKelolaKeuangan: 83,
      total: 81.0
    }
  },
  {
    id: "3",
    nama: "Desa Sejahtera Mandiri",
    kecamatan: "Kecamatan Maju",
    kabupaten: "Kabupaten Berkah",
    provinsi: "Jawa Timur",
    tahun: 2024,
    indeksTotal: 82.8,
    layananDasar: {
      pendidikan: 84,
      kesehatan: 86,
      utilitasDasar: 81,
      total: 83.7
    },
    sosial: {
      aktivitas: 85,
      fasilitasMasyarakat: 80,
      total: 82.5
    },
    ekonomi: {
      produksiDesa: 83,
      fasilitasPendukung: 85,
      total: 84.0
    },
    lingkungan: {
      pengelolaanLingkungan: 79,
      penanggulanganBencana: 87,
      total: 83.0
    },
    aksesibilitas: {
      kondisiAksesJalan: 88,
      kemudahanAkses: 84,
      total: 86.0
    },
    tataKelola: {
      kelembagaan: 81,
      tataKelolaKeuangan: 85,
      total: 83.0
    }
  },
  {
    id: "4",
    nama: "Desa Harapan Baru",
    kecamatan: "Kecamatan Jaya",
    kabupaten: "Kabupaten Maju",
    provinsi: "Jawa Barat",
    tahun: 2024,
    indeksTotal: 73.2,
    layananDasar: {
      pendidikan: 71,
      kesehatan: 75,
      utilitasDasar: 73,
      total: 73.0
    },
    sosial: {
      aktivitas: 76,
      fasilitasMasyarakat: 74,
      total: 75.0
    },
    ekonomi: {
      produksiDesa: 72,
      fasilitasPendukung: 70,
      total: 71.0
    },
    lingkungan: {
      pengelolaanLingkungan: 68,
      penanggulanganBencana: 76,
      total: 72.0
    },
    aksesibilitas: {
      kondisiAksesJalan: 78,
      kemudahanAkses: 75,
      total: 76.5
    },
    tataKelola: {
      kelembagaan: 74,
      tataKelolaKeuangan: 72,
      total: 73.0
    }
  },
  {
    id: "5",
    nama: "Desa Cinta Damai",
    kecamatan: "Kecamatan Harmoni",
    kabupaten: "Kabupaten Damai",
    provinsi: "Yogyakarta",
    tahun: 2024,
    indeksTotal: 88.7,
    layananDasar: {
      pendidikan: 91,
      kesehatan: 89,
      utilitasDasar: 87,
      total: 89.0
    },
    sosial: {
      aktivitas: 88,
      fasilitasMasyarakat: 90,
      total: 89.0
    },
    ekonomi: {
      produksiDesa: 89,
      fasilitasPendukung: 87,
      total: 88.0
    },
    lingkungan: {
      pengelolaanLingkungan: 86,
      penanggulanganBencana: 92,
      total: 89.0
    },
    aksesibilitas: {
      kondisiAksesJalan: 93,
      kemudahanAkses: 90,
      total: 91.5
    },
    tataKelola: {
      kelembagaan: 87,
      tataKelolaKeuangan: 91,
      total: 89.0
    }
  }
];

// Data tren per tahun
export const trendData = [
  { tahun: 2020, indeksRataRata: 75.2 },
  { tahun: 2021, indeksRataRata: 76.8 },
  { tahun: 2022, indeksRataRata: 78.5 },
  { tahun: 2023, indeksRataRata: 80.1 },
  { tahun: 2024, indeksRataRata: 81.6 }
];

// Fungsi helper untuk mendapatkan data
export const getDesaList = () => desaData;

export const getDesaById = (id: string) => desaData.find(desa => desa.id === id);

export const getDesaByWilayah = (wilayah: string) => 
  desaData.filter(desa => 
    desa.kecamatan.toLowerCase().includes(wilayah.toLowerCase()) ||
    desa.kabupaten.toLowerCase().includes(wilayah.toLowerCase()) ||
    desa.provinsi.toLowerCase().includes(wilayah.toLowerCase())
  );

export const getTrendData = () => trendData;

export const getRataRataDimensi = () => {
  const totalData = desaData.length;
  return {
    layananDasar: desaData.reduce((sum, desa) => sum + desa.layananDasar.total, 0) / totalData,
    sosial: desaData.reduce((sum, desa) => sum + desa.sosial.total, 0) / totalData,
    ekonomi: desaData.reduce((sum, desa) => sum + desa.ekonomi.total, 0) / totalData,
    lingkungan: desaData.reduce((sum, desa) => sum + desa.lingkungan.total, 0) / totalData,
    aksesibilitas: desaData.reduce((sum, desa) => sum + desa.aksesibilitas.total, 0) / totalData,
    tataKelola: desaData.reduce((sum, desa) => sum + desa.tataKelola.total, 0) / totalData
  };
};
