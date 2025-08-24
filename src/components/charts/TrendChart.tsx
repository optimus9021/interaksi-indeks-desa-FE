'use client'

import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';

interface TrendChartProps {
  data: { tahun: number; indeksRataRata: number }[];
  height?: number;
}

export function TrendChart({ data, height = 300 }: TrendChartProps) {
  const { theme } = useTheme();
  
  const option = useMemo(() => ({
    title: {
      text: 'Tren Indeks Desa',
      left: 'center',
      textStyle: {
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937',
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
      borderColor: theme === 'dark' ? '#6b7280' : '#e5e7eb',
      textStyle: {
        color: theme === 'dark' ? '#f3f4f6' : '#1f2937'
      },
      formatter: (params: any) => {
        const data = params[0];
        return `Tahun ${data.name}<br/>Indeks: ${data.value.toFixed(1)}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.tahun),
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisTick: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
      }
    },
    yAxis: {
      type: 'value',
      min: 70,
      max: 90,
      axisLine: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisTick: {
        lineStyle: {
          color: theme === 'dark' ? '#6b7280' : '#d1d5db'
        }
      },
      axisLabel: {
        color: theme === 'dark' ? '#9ca3af' : '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: theme === 'dark' ? '#374151' : '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: 'Indeks Rata-rata',
        type: 'line',
        data: data.map(d => d.indeksRataRata),
        smooth: true,
        lineStyle: {
          color: '#3b82f6',
          width: 3
        },
        itemStyle: {
          color: '#3b82f6',
          borderWidth: 2,
          borderColor: '#ffffff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)'
              }
            ]
          }
        }
      }
    ]
  }), [data, theme]);

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px` }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
