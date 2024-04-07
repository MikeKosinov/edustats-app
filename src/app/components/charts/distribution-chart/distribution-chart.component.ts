import {Component, Input} from '@angular/core';
import { ChartDataset, ChartOptions, ChartType} from "chart.js";

import {IGroupWithGrades} from "../../../interfaces/groups/IGroupWithGrades.interface";
interface IGradeDistribution {
  category: string;
  count: number;
}
@Component({
  selector: 'app-distribution-chart',
  templateUrl: './distribution-chart.component.html',
  styleUrls: ['./distribution-chart.component.scss']
})
export class DistributionChartComponent {
  @Input() groupWithGradesData: IGroupWithGrades[] = [];

  barChartData: ChartDataset[] = [];
  barChartLabels: string[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  barChartLegend = true;
  barChartType: ChartType = 'bar';

  ngOnChanges() {
      this.updateChart();
  }

  private updateChart() {
    this.barChartData = this.groupWithGradesData.map(data => ({
      data: Object.values(data.grades).reverse(), // Изменено: используйте reverse() для изменения порядка элементов массива
      label: data.group
    }));
    this.barChartLabels = Object.keys(this.groupWithGradesData[0]?.grades || {}).reverse(); // Изменено: используйте reverse() для изменения порядка элементов массива
  }

}
