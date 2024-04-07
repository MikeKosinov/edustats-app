import {Component, OnInit} from '@angular/core';
import { ChartDataset, ChartOptions, LabelItem} from "chart.js";
import {ExcelDataService} from "../../../services/readExcel/excel-data.service";
import {GradeCalculation} from "../../../helpers/GradeCalculation";
import DataLabelsPlugin from "chartjs-plugin-datalabels";

@Component({
  selector: 'app-dognut-chart',
  templateUrl: './dognut-chart.component.html',
  styleUrls: ['./dognut-chart.component.scss']
})
export class DognutChartComponent implements OnInit{
  doughnutChartLabels: string[] = [];
  doughnutChartData:ChartDataset<'doughnut'>[] = [{data:[],label:"Кількість оцінок"}];
  //doughnutChartPlugins = [DataLabelsPlugin];
  doughnutChartOptions:ChartOptions<'doughnut'> = {
    responsive:true,
    maintainAspectRatio:false,
    plugins:{
      legend:{
        display:true,
        position:'top'
      }
    }
  }
   constructor( private dataService:ExcelDataService) {
  }
   ngOnInit() {
    let  marksStudents:number[] = this.dataService.getAllMarks();
     const distributedGrades = GradeCalculation.distributeGrades(marksStudents);
     Object.entries(distributedGrades).forEach(([category, data]) => {
       if (data.length > 0) {
         this.doughnutChartData[0].data.push(data.length);
         this.doughnutChartLabels.push(category);
       }
     });
  }
}
