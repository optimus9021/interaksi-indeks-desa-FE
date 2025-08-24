'use client'

import ReactECharts from 'echarts-for-react';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import { DesaData } from '@/data/indeksDesaDummy';

interface ComparisonChartProps {
  data: DesaData[];
  height?: number;
  title?: string;
}

export function ComparisonChart({ data, height = 400, title = "Perbandingan Indeks Desa" }: ComparisonChartProps) {
  const { theme } = useTheme();
  
  const option = useMemo(() => ({
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
      },
      formatter: (params: Array<{name: string; value: number}>) => {
        const data = params[0];
        return `${data.name}<br/>Indeks Total: ${data.value.toFixed(1)}`;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.nama),
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
        color: theme === 'dark' ? '#9ca3af' : '#6b7280',
        rotate: 45,
        interval: 0
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 100,
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
        name: 'Indeks Total',
        type: 'bar',
        data: data.map(d => ({
          value: d.indeksTotal,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: d.indeksTotal >= 85 ? '#10b981' : d.indeksTotal >= 75 ? '#3b82f6' : '#f59e0b'
                },
                {
                  offset: 1,
                  color: d.indeksTotal >= 85 ? '#047857' : d.indeksTotal >= 75 ? '#1d4ed8' : '#d97706'
                }
              ]
            }
          }
        })),
        barWidth: '60%',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          }
        }
      }
    ]
  }), [data, theme, title]);

  return (
    <ReactECharts
      option={option}
      style={{ height: `${height}px` }}
      opts={{ renderer: 'canvas' }}
    />
  );
}
