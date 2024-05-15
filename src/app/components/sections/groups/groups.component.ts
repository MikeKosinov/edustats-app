import { Component, OnInit } from '@angular/core';
import { ExcelDataService } from '../../../services/readExcel/excel-data.service';
import { GradeCalculation } from 'src/app/helpers/GradeCalculation';
import { StudentDataFormatter } from 'src/app/helpers/studentDataFormatter';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  /// this array define the requirements statistic criteries for group section
  /// Don't redifine it as independent instance for current project
  criteriaArray = [
    { name: 'Мода', value: 0 },
    { name: 'Медіана', value: 0 },
    { name: 'Середній бал', value: 0 },
    { name: 'Стандартне відхилення', value: 0 },
    { name: 'Дисперсія', value: 0 },
  ];
  title: string = 'Статистичні дані  навчальної групи';
  groups: string[] = [];
  marks: any = [];
  studentsData: any = [];
  students: any = [];

  statisticsCriteria = this.criteriaArray;
  /// calculation for every criteria
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

  constructor(private dataService: ExcelDataService) {}
  ngOnInit() {
    this.groups = this.dataService.getAllGroups();
    const data = this.dataService.getTransformedDataAsObjects();
    this.studentsData = StudentDataFormatter.transformToStudentCards(data);
    console.log(data);
    let unfilteredMarks = this.dataService.getAllMarks();
    this.marks = unfilteredMarks.filter((mark) => mark !== 0);
    this.calculateCriteria();
  }
  onSelectGroupResult(groupName: string) {
    this.students = this.studentsData.filter(
      (student: any) => student.group === groupName
    );
    console.log('it works');
    this.calculateCriteria();
  }

  ///method for statistic critea caltulations
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
