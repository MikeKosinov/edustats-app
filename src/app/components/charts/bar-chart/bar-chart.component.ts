import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ExcelDataService } from '../../../services/readExcel/excel-data.service';
import { max } from 'rxjs';

interface GroupAverage {
  group: string;
  semester: number;
  average: number;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
})
export class BarChartComponent implements OnInit {
  averageMarkBySemester: any = [];

  barChartData: any[] = [{ data: [] }];
  barChartLabels: string[] = [];

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { x: { stacked: true }, y: { stacked: true } },
  };
  barChartLegend = false;
  barChartType: ChartType = 'bar';
  barChartPlugins = [];
  constructor(private dataService: ExcelDataService) {}
  ngOnInit() {
    const data = this.dataService.getAverageScorePerGroupPerSemester();

    this.barChartLabels = Array.from(new Set(data.map((score) => score.group)));
    this.barChartData = [{ data: [79.1, 81.6, 82] }];
    //const data = this.dataService.getAverageScoresInGroups();
    //const sortedGroups = this.averageMarkBySemester.sort((a, b) => a.averageMark - b.averageMark);
    //this.barChartLabels = sortedGroups.map((group) => group.group);
    //this.barChartData[0].data = sortedGroups.map((group) => group.averageMark);
  }
}
