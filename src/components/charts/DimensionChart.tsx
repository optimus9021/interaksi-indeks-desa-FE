'use client'

import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

interface DimensionChartProps {
  data: {
    layananDasar: number;
    sosial: number;
    ekonomi: number;
    lingkungan: number;
    aksesibilitas: number;
    tataKelola: number;
  };
  height?: number;
  title?: string;
}

export function DimensionChart({ data, height = 400, title = "Rata-rata Dimensi Indeks Desa" }: DimensionChartProps) {
  const { theme } = useTheme();
  
  const option = useMemo(() => {
    const dimensions = [
      { name: 'Layanan Dasar', value: data.layananDasar },
      { name: 'Sosial', value: data.sosial },
      { name: 'Ekonomi', value: data.ekonomi },
      { name: 'Lingkungan', value: data.lingkungan },
      { name: 'Aksesibilitas', value: data.aksesibilitas },
      { name: 'Tata Kelola', value: data.tataKelola }
    ];

    return {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
          fontSize: 16,
          fontWeight: 'bold'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
        borderColor: theme === 'dark' ? '#6b7280' : '#e5e7eb',
        textStyle: {
          color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
        }
      },
      radar: {
        indicator: dimensions.map(d => ({
          name: d.name,
          max: 100,
          nameTextStyle: {
            color: theme === 'dark' ? '#9ca3af' : '#6b7280',
            fontSize: 12
          }
        })),
        splitLine: {
          lineStyle: {
            color: theme === 'dark' ? '#374151' : '#f3f4f6'
          }
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              theme === 'dark' ? 'rgba(75, 85, 99, 0.1)' : 'rgba(249, 250, 251, 0.5)',
              theme === 'dark' ? 'rgba(55, 65, 81, 0.1)' : 'rgba(255, 255, 255, 0.5)'
            ]
          }
        },
        axisLine: {
          lineStyle: {
            color: theme === 'dark' ? '#6b7280' : '#d1d5db'
          }
        }
      },
      series: [
        {
          name: 'Indeks Dimensi',
          type: 'radar',
          data: [
            {
              value: dimensions.map(d => d.value),
              name: 'Rata-rata',
              itemStyle: {
                color: '#3b82f6'
              },
              areaStyle: {
                color: 'rgba(59, 130, 246, 0.2)'
              },
              lineStyle: {
                color: '#3b82f6',
                width: 2
              }
            }
          ]
        }
      ]
    };
  }, [data, theme, title]);

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px` }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
