'use client'
import {
    Card, 
    CardHeader, 
    CardBody, 
} from "@heroui/card";
import { ApexOptions } from "apexcharts";
//import Chart from "react-apexcharts";
import dynamic from "next/dynamic";


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export default function OverviewChart() {

   const options: ApexOptions = {
    chart: {
        type: 'bar' as const,
        selection: {
            enabled: true
          },
        toolbar: {
            show: true,
            offsetX: 5,
            offsetY: 5,
            tools: {
                download: true,
                selection: true,
                zoom: true,
                zoomin: true,
                zoomout: true,
                pan: true,
                reset: true,
            }
        },
        background: '00FFFFFF',
    },
    theme: {
        mode: "dark", 
        palette: 'palette10', 
        monochrome: {
            enabled: true,
            color: '#008FFB',
            shadeTo: 'dark',
            shadeIntensity: 1
        },
    },
    plotOptions: {
        bar: {
            borderRadius: 6,
            borderRadiusApplication: "around" as const,
            columnWidth: '70%',
            barHeight: '70%',
            distributed: false,
        }
    },
    dataLabels: {
        enabled: false,
    },
    tooltip: {
        enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      hideEmptySeries: true,
      fillSeriesColor: false,
      theme: 'dark',
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      onDatasetHover: {
          highlightDataSeries: true,
      },
      x: {
          show: true,
          format: 'dd MMM',
          formatter: undefined,
      },
      y: {
          formatter: undefined,
          title: {
              formatter: (seriesName: string) => seriesName,
          },
      },
      z: {
          formatter: undefined,
          title: 'Size: '
      },
      marker: {
          show: true,
      },

    },
    legend: {
        show: true,
        fontSize: '15px',
        horizontalAlign: 'center' as const,
        position: 'bottom' as const,
        offsetY: 10,
        itemMargin: {
            horizontal: 10,
            vertical: 10
        },
        markers: {
          size: 10,
          shape: 'circle' as const ,
        },
    },
    responsive: [
        {
            breakpoint: 768,
            options: {
                legend: {
                    show: false
                },
                plotOptions: {
                    bar: {
                        columnWidth: '30%',
                        barHeight: '70%',
                        distributed: false,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                subtitle: {
                    text: 'Income x Expense',
                    align: 'left' as const,
                    margin: 5,
                    offsetX: 0,
                    offsetY: 0,
                    floating: false,
                    style: {
                      fontSize:  '15px',
                      fontWeight:  'normal',
                      fontFamily:  undefined,
                      color:  '#9699a2'
                    },
                },
            }
        }
    ],
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    series: [{
        name: 'Monthly-Expense',
        data: [1900, 1500, 1350, 2000, 2050, 1900, 1875, 1950, 1790, 1950, 1750, 1950]
    },
    {
        name: 'Monthly-Income',
        data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000]
    }]
   }


    return (
        <Card
        className="w-full max-w-full lg:w-1/2"
        >
            <CardHeader >
                <h1 className="text-xl text-gray-400">Income x Expenses</h1>
            </CardHeader>
            <CardBody>
            <Chart 
                
                options={options}
                series={options.series}
                type="bar"
                width="100%"
                height="350"
                />
            </CardBody>
        </Card>
    )
}