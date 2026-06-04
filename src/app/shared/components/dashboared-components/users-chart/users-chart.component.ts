import { Component, Input, ViewChild } from "@angular/core";
import {
  ChartComponent,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexDataLabels,
  ApexNonAxisChartSeries,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: any;  //Accept both
  chart: ApexChart;
  labels: string[];
  colors: string[];
  responsive: ApexResponsive[];
  dataLabels: any;
  tooltip: any;
  legend: ApexLegend;
};

@Component({
  selector: 'app-users-chart',
  templateUrl: './users-chart.component.html',
  styleUrls: ['./users-chart.component.scss']
})
export class UsersChartComponent {
  @ViewChild("chart")
  chart!: ChartComponent;
  public chartOptions!: ChartOptions;

  @Input() series: ApexNonAxisChartSeries = [];
  @Input() labels: string[] = [];
  @Input() colors: string[] = [];

  ngOnChanges(): void {
    this.buildChart();
  }

  private buildChart() {
    const total = this.series.reduce((a, b) => a + b, 0);

    this.chartOptions = {
      series: this.series,
      chart: {
        type: 'donut',
        height: 350,
      },
      labels: this.labels,
      colors: this.colors,

      legend: {
        show: false
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => {
          return val.toFixed(1) + '%';
        },
      },

      tooltip: {
        y: {
          formatter: (value: number) => {
            const percent = ((value / total) * 100).toFixed(1);
            return `${value} (${percent}%)`;
          },
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
          },
        },
      ],
    };
  }

  // constructor() {
  //   this.chartOptions = {
  //     series: [44, 55, 41],
  //     chart: {
  //      type: "donut",
  //       height: 350
  //     },
  //     labels: ["Active Users", "Inactive Users", "Team C"],
  //     colors: ["#FFD966", "#80CAFF", "#85E0A3"],
  //     dataLabels: {
  //       enabled: true,
  //       formatter: (val: number) => val.toFixed(1) + "%"  //shows percent
  //     },
  //     responsive: [
  //       {
  //         breakpoint: 480,
  //         options: {
  //           chart: { width: 200 },
  //           legend: { position: "bottom" }
  //         }
  //       }
  //     ]
  //   };
  // }
}
