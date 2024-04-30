import Chart from "react-apexcharts";
import { formatter } from "../utils/formatter";
import { ChannelData } from "../types";

interface BarChartProps {
  chartData: Record<string, ChannelData>;
}

export const BarChart = ({ chartData }: BarChartProps) => {
  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: Object.keys(chartData),
      labels: {
        formatter: function (value: string) {
          return formatter.format(Number(value));
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
  };
  const series = [
    {
      name: "Gross Sales",
      data: Object.entries(chartData).map(([, value]) => value.grossSales),
    },
  ];

  return (
    <Chart options={chartOptions} series={series} type="bar" height="350px" />
  );
};
