import { Component, Input, OnInit, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartDataset,
  ChartEvent,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { ExcelDataService } from '../../../services/readExcel/excel-data.service';
import { IAverageScore } from '../../../interfaces/AverageScore';
import { IAverageScorePerSemester } from '../../../interfaces/groups/IGroupAveragePerSemester.interface';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @Input() averageScores: IAverageScorePerSemester[] = [];

  lineChartData: ChartDataset[] = [];
  lineChartLabels: string[] = [];
  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  tensionForLines: number = 0.4;
  lineChartLegend = true;
  lineChartType: ChartType = 'line';

  ngOnInit() {
    this.updateChart();
  }
  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    const uniqueGroups = Array.from(
      new Set(this.averageScores.map((score) => score.group))
    );
    this.lineChartData = uniqueGroups.map((group) => {
      const groupScores = this.averageScores.filter(
        (score) => score.group === group
      );
      return {
        data: groupScores.map((score) => score.average),
        label: group,
        tension: this.tensionForLines,
      };
    });
    const semesters = Array.from(
      new Set(this.averageScores.map((score) => score.semester))
    );
    this.lineChartLabels = semesters
      .sort((a, b) => a - b)
      .map((semester) => semester.toString());
  }
}
