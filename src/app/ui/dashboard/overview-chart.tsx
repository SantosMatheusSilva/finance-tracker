'use client'
import {
    Card, 
    CardHeader, 
    CardBody, 
} from "@heroui/card";
import { ApexOptions } from "apexcharts";
//import Chart from "react-apexcharts";
import dynamic from "next/dynamic";
import { ChartSkeleton } from "@/app/ui/Skeleletons";
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
    //loading: () => <ChartSkeleton />
  });
import { useDashboard } from "@/app/context/dashboardContext";
import { useUser } from "@/app/context/sessionDataProvider";
import { getMonthlyTotals } from "@/app/lib/services/transactionsServices";

import { useState, useEffect } from "react";

//const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
export function ChartComponent() {
    const { sessionUser } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const [monthlyTotals, setMonthlyTotals] = useState<{ income: number[], expenses: number[] }>({ income: [], expenses: [] });

    const [chartSeries, setChartSeries] = useState<{ name: string; data: number[] }[]>([
        {
            name: 'Monthly-Expense',
            data: monthlyTotals.expenses
        },
        {
            name: 'Monthly-Income',
            data: []
        }
    ]);

    const { refreshDashboard } = useDashboard();

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            const totals = await getMonthlyTotals(sessionUser?.user_id);
            setMonthlyTotals(totals);
            setChartSeries([
                {
                    name: 'Monthly-Expense',
                    data: totals.expenses.map(val => Number(val.toFixed(2)))
                },
                {
                    name: 'Monthly-Income',
                    data: totals.income.map(val => Number(val.toFixed(2)))
                }
            ]);
            setIsLoading(false);
            console.log("totals -->", totals);
        };
        loadData();
    }, [sessionUser?.user_id, refreshDashboard]);

    // Utility check for all-zero arrays
    const isAllZero = (arr: number[]) => arr.every(val => val === 0);


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
          formatter: (value: number) => value.toLocaleString('en-EU', { style: 'currency', currency: 'EUR' }),
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
        data: []
    },
    {
        name: 'Monthly-Income',
        data: []
    }]
   }

    if (isLoading) {
        return <ChartSkeleton />;
    }

    return (
        <Card className="w-full max-w-full lg:w-1/2">
            <CardHeader>
                <h1 className="text-xl text-gray-400">Income x Expenses</h1>
            </CardHeader>
            <CardBody>
                <div className="relative w-full h-[350px]">
                    <Chart
                        options={options}
                        series={chartSeries}
                        type="bar"
                        width="100%"
                        height="350"
                    />
                    {(isAllZero(monthlyTotals.expenses) && isAllZero(monthlyTotals.income)) && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-md flex items-center justify-center text-center text-white px-6">
                            <p className="text-sm md:text-base">
                                Once you start adding transactions, your income and expense trends will be visualized here.
                            </p>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default function OverviewChart() {

    return  <ChartComponent />;
}