import {IGradesDistributionInterface} from "../interfaces/marks/IGradesDistribution.interface";
import {IStudent} from "../interfaces/students/IStudent.interface";
import {IGroupSummary} from "../interfaces/groups/IGroupSummary.interface";

export  class GradeCalculation{
  constructor() {
  }
//Calculations for statistics criteria
  static calculateMode(data: number[]): number {
    const frequencyMap: { [key: number]: number } = {};
    data.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });
    let mode: number | null = null;
    let maxFrequency = 0;

    for (const value in frequencyMap) {
      if (frequencyMap[value] > maxFrequency) {
        mode = +value;
        maxFrequency = frequencyMap[value];
      }
    }
    return mode || 0;
  }
  static calculateMedian(data: number[]): number {
    const sortedData = data.slice().sort((a, b) => a - b);
    const length = sortedData.length;
    if (length % 2 === 0) {
      const midIndex = length / 2;
      return (sortedData[midIndex - 1] + sortedData[midIndex]) / 2;
    } else {
      const midIndex = Math.floor(length / 2);
      return sortedData[midIndex];
    }
  }
  static calculateAverage(grades:number[]):number{
    const sum = grades.reduce((accumulator, currentGrade) => accumulator + currentGrade, 0);

    return parseFloat((sum / grades.length).toFixed(2));
  }
  static calculateVariance(data: number[]): number {
    const n = data.length;
    const mean = data.reduce((sum, value) => sum + value, 0) / n;
    const sumSquaredDeviations =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0);
    return  parseFloat((sumSquaredDeviations / n).toFixed(2));
  }
  static calculateStandardDeviation(grades: number[]): number {
    if (grades.length < 2) {
      return 0;
    }
    const mean:number = this.calculateAverage(grades);
    const squaredDifferences = grades.map(grade => Math.pow(grade - mean, 2));
    const sumSquaredDifferences = squaredDifferences.reduce(
      (accumulator, squaredDifference) => accumulator + squaredDifference, 0);
    const variance = sumSquaredDifferences / (grades.length - 1);
    return    parseFloat(Math.sqrt(variance).toFixed(2)) ;
  }


  static getCalculatedGroupAverageMarks(students: IStudent[]): IGroupSummary[] {
    const groupStatsMap: { [group: string]: { totalMark: number; count: number } } = {};

    students.forEach((student) => {
      let { group, mark } = student;
      if (!groupStatsMap[group]) {
        groupStatsMap[group] = { totalMark: 0, count: 0 };
      }
      groupStatsMap[group].totalMark += mark;
      groupStatsMap[group].count++;
    });

    const groupAverageMarks: IGroupSummary[] = [];
    for (const group in groupStatsMap) {
      if (groupStatsMap.hasOwnProperty(group)) {
        const { totalMark, count } = groupStatsMap[group];
        const averageMark = +(totalMark / count).toFixed(1);
        const studentCount = this.getCountStudentsPerGroup(students)[group];
        groupAverageMarks.push({ group, averageMark, studentCount });
      }
    }
    return groupAverageMarks;
  }

  static getCountStudentsPerGroup(students: IStudent[]): { [group: string]: number } {
    const uniqueStudentsPerGroup: { [group: string]: Set<string> } = {};

    students.forEach((student) => {
      const { group, name, last_name } = student;
      if (!uniqueStudentsPerGroup[group]) {
        uniqueStudentsPerGroup[group] = new Set();
      }
      const studentKey = `${name}-${last_name}`;
      uniqueStudentsPerGroup[group].add(studentKey);
    });
    const countPerGroup: { [group: string]: number } = {};
    for (const group in uniqueStudentsPerGroup) {
      if (uniqueStudentsPerGroup.hasOwnProperty(group)) {
        countPerGroup[group] = uniqueStudentsPerGroup[group].size;
      }
    }
    return countPerGroup;
  }
  /**
   * The method distribute marks by categories, divided they on arrays.
   * This arrays will be using in dynamic filling data in charts
   * @param grades - array of marks
   * @return object with type {IGradeDistributionInterface}
   * */
  static distributeGrades(grades:number []): IGradesDistributionInterface {
    const categories: IGradesDistributionInterface = {
      '90-100': [],
      '82-89': [],
      '73-81':[],
      '64-72':[],
      '60-63': [],
      'не склав': [],
    };
    grades.forEach((grade) => {
      if (grade >= 90) {
        categories['90-100'].push(grade);
      } else if (grade >= 82 && grade <= 89) {
        categories['82-89'].push(grade);
      } else if (grade >= 73 && grade <= 81) {
        categories['73-81'].push(grade);
      } else if (grade >= 64 && grade <= 72) {
        categories['64-72'].push(grade);
      } else if(grade>=60 &&  grade<=63){
        categories['60-63'].push(grade);
      }
      else {
        categories['не склав'].push(grade);
      }
    });
    return categories;
  }
}
