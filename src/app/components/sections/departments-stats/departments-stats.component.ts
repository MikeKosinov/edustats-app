import { Component, OnInit } from '@angular/core';
import { ExcelDataService } from '../../../services/readExcel/excel-data.service';
import { IStatisticCriteria } from '../../../interfaces/IStatisticCriteria.interface';
import { GradeCalculation } from '../../../helpers/GradeCalculation';
import { criteriaArray } from '../../../helpers/criterias/statisticCriterias';

@Component({
  selector: 'app-departments-stats',
  templateUrl: './departments-stats.component.html',
  styleUrls: ['./departments-stats.component.scss'],
})
export class DepartmentsStatsComponent implements OnInit {
  title: string = 'Загальні статистичні дані успішності студентів кафедри';
  statisticsCriteria: IStatisticCriteria[] = criteriaArray;
  modeCriteria = this.statisticsCriteria.find(
    (criteria) => criteria.name === 'Мода'
  );
  medianCriteria = this.statisticsCriteria.find(
    (criteria) => criteria.name === 'Медіана'
  );
  averageCriteria = this.statisticsCriteria.find(
    (criteria) => criteria.name === 'Середній бал'
  );
  standartDeviationCriteria = this.statisticsCriteria.find(
    (criteria) => criteria.name === 'Стандартне відхилення'
  );
  varianceCriteria = this.statisticsCriteria.find(
    (criteria) => criteria.name === 'Дисперсія'
  );
  marksDistribution: any = [];
  averageMarkBySemester: any = [];
  marks: any = [];
  constructor(private dataService: ExcelDataService) {}

  ngOnInit() {
    this.marksDistribution = this.dataService.getGroupGradesDistribution();
    this.averageMarkBySemester =
      this.dataService.getAverageScorePerGroupPerSemester();
    console.log(this.averageMarkBySemester);
    let unfilteredMarks = this.dataService.getAllMarks();
    this.marks = unfilteredMarks.filter((mark) => mark !== 0);
    this.calculateCriteria();
  }
  calculateCriteria() {
    if (this.modeCriteria && this.marks.length > 0) {
      this.modeCriteria.value = GradeCalculation.calculateMode(this.marks);
    }
    if (this.medianCriteria && this.marks.length > 0) {
      this.medianCriteria.value = GradeCalculation.calculateMedian(this.marks);
    }
    if (this.averageCriteria && this.marks.length > 0) {
      this.averageCriteria.value = GradeCalculation.calculateAverage(
        this.marks
      );
    }
    if (this.standartDeviationCriteria && this.marks.length > 0) {
      this.standartDeviationCriteria.value =
        GradeCalculation.calculateStandardDeviation(this.marks);
    }
    if (this.varianceCriteria && this.marks.length > 0) {
      this.varianceCriteria.value = GradeCalculation.calculateVariance(
        this.marks
      );
    }
  }
}
