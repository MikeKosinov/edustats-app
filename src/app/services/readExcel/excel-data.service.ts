import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { GradeCalculation } from '../../helpers/GradeCalculation';
import { IGroupWithGrades } from '../../interfaces/groups/IGroupWithGrades.interface';
import { IAverageScorePerSemester } from '../../interfaces/groups/IGroupAveragePerSemester.interface';

@Injectable({
  providedIn: 'root',
})
export class ExcelDataService {
  dataSubject: Subject<any[]> = new Subject<any[]>();
  isFileUploaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  dataArray: any[] = []; //array of arrays
  constructor() {}
  setFileUploaded(value: boolean): void {
    this.isFileUploaded.next(value);
  }

  getFileUploaded(): Observable<boolean> {
    return this.isFileUploaded.asObservable();
  }
  /**
   * @description this method exctract all data from uploaded  .xlsx file
   *
   * */
  readExcelFile(file: File) {
    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const data: any[] = this.processExcel(e.target.result);
      this.dataArray = data;
      this.getTransformedDataAsObjects(); //consist objects of table
      this.dataSubject.next(data);
    };
    reader.readAsBinaryString(file);
  }
  /**
   * @description processExcel define rules for getting data from Excel file
   * @param data {any}  - data from Excel without formatting
   * @return {any []} - data in JSON format
   * */
  private processExcel(data: any): any[] {
    const workbook = XLSX.read(data, { type: 'binary' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(sheet, { header: 1 });
  }
  getData(): Observable<any[]> {
    return this.dataSubject.asObservable();
  }
  getGroupGradesDistribution(): IGroupWithGrades[] {
    const students = this.getTransformedDataAsObjects();
    const groups = this.getAllGroups();

    return groups.map((group) => {
      const groupStudents = students.filter(
        (student) => student.group === group
      );
      const distributedGrades = GradeCalculation.distributeGrades(
        groupStudents.map((student) => student.mark)
      );

      return {
        group,
        grades: {
          '90-100': distributedGrades['90-100'].length,
          '82-89': distributedGrades['82-89'].length,
          '73-81': distributedGrades['73-81'].length,
          '64-72': distributedGrades['64-72'].length,
          '60-63': distributedGrades['60-63'].length,
          'не склав': distributedGrades['не склав'].length,
        },
      };
    });
  }
  getAllMarks(): number[] {
    let studentsDataArr = this.getTransformedDataAsObjects();
    return studentsDataArr.reduce(
      (acc, student) => acc.concat(student.mark),
      []
    );
  }
  getAllGroups(): string[] {
    let studentsData = this.getTransformedDataAsObjects();
    const groups: Set<string> = new Set(
      studentsData.map((student) => student.group)
    );
    return Array.from(groups);
  }
  getTypesOfControl():string[]{
    let studentsDataArr = this.getTransformedDataAsObjects();
    const typesOfControl:Set<string> = new Set(
      studentsDataArr.map((student) => student.type_of_control)
    );
    return Array.from(typesOfControl);
  }
  /**
   * @description this method convert input data in array of data object
   * @return {IStudent[]} array
   * */
  getTransformedDataAsObjects(): any[] {
    const keysArray = this.dataArray[0];
    const valuesArrays = this.dataArray.slice(1);
    const nonEmptyArrays = valuesArrays.filter(
      (valueArray) => valueArray.length > 0
    );
    // create array using first data array as keys for remaining values
    const resultArray = nonEmptyArrays.map((valueArray) => {
      const obj: any = {};
      keysArray.forEach((key: string, index: any) => {
        if (key === 'mark' && valueArray[index] === 'не склав') {
          obj[key] = 0;
        } else {
          obj[key] = valueArray[index];
        }
      });
      return obj;
    });
    return resultArray;
  }

  getAverageScoresInGroups() {
    const data = this.getTransformedDataAsObjects();
    return GradeCalculation.getCalculatedGroupAverageMarks(data);
  }
  getAverageScorePerGroupPerSemester(): IAverageScorePerSemester[] {
    const students = this.getTransformedDataAsObjects();
    const groupSemesterMap: {
      [key: string]: { total: number; count: number };
    } = {};

    students.forEach((student) => {
      let { group, semester, mark } = student;
      if (mark === 'не склав') {
        mark = 0;
      }
      const key = `${group}--${semester}`;

      if (!groupSemesterMap[key]) {
        groupSemesterMap[key] = { total: 0, count: 0 };
      }
      groupSemesterMap[key].total += mark;
      groupSemesterMap[key].count++;
    });
    const averageScores: IAverageScorePerSemester[] = [];
    for (const key in groupSemesterMap) {
      if (groupSemesterMap.hasOwnProperty(key)) {
        const [group, semester] = key.split('--');
        const { total, count } = groupSemesterMap[key];
        const average = count > 0 ? total / count : 0;
        averageScores.push({ group, semester: +semester, average });
      }
    }

    return averageScores;
  }
}
