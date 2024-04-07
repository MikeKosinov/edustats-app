import { Component, Input } from '@angular/core';
import {IStudentCard} from "../../interfaces/students/IStudentCard.interface";
import {IMarksInterface} from "../../interfaces/marks/IMarks.interface";

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  @Input() student:IStudentCard;

  getMaxSemester(student: IStudentCard): number {
    return student.marks.reduce((max, mark) => Math.max(max, mark.semester), 0);
  }

  // constructor(private excelDataService:ExcelDataService) {
  //   this.excelDataService.getData().subscribe((data)=>{
  //     console.log('student component get data')
  //     this.student=data;
  //   })
  // }

  getStudentData(){

  }
  //ngOnInit() {
    // Вызываем метод получения данных при инициализации компонента
  //   this.getSheetData();
  // }

  // getSheetData() {
  //   const range = 'Sheet1!A1:B10'; // Замените на диапазон вашего листа
  //   this.googleSheetsService.getSheetData(range).subscribe((data) => {
  //     this.sheetData = data.values;
  //   });
  // }
  // constructor(private googleAppScriptsService: GoogleAppScriptsService) {}
  // ngOnInit(): void {
  //   this.loadData();
  // }

  // loadData(): void {
  //   this.googleAppScriptsService.readData().subscribe(
  //     (tabledata) => console.log(tabledata)
  //     (error) => {
  //   console.log(error, 'to read data');
  // }
  // );
  // }
  //     (data) => {
  //       this.data = data;
  //       console.log('Sheet data:', this.data);
  //     },
  //     (err) => {
  //       console.error('Error loading data:', err);
  //     }
  //   );
  // }
  protected readonly Math = Math;
}
