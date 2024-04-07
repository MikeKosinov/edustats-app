import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ChangeDetectorRef } from '@angular/core';
import { ExcelDataService } from '../../../services/readExcel/excel-data.service';
import { IStudentCard } from '../../../interfaces/students/IStudentCard.interface';
import { StudentDataFormatter } from '../../../helpers/studentDataFormatter';

@Component({
  selector: 'app-student-stats',
  templateUrl: './student-stats.component.html',
  styleUrls: ['./student-stats.component.scss'],
})
export class StudentStatsComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  students: IStudentCard[] = [];
  filteredStudents: IStudentCard[] = [];
  groups:string[] = []

  //paginator fields
  itemsPerPageOptions = [20, 50, 100];
  itemsPerPage = this.itemsPerPageOptions[0]; // Default value
  currentPage = 1;
  constructor(
    private excelDataService: ExcelDataService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    const studentData = this.excelDataService.getTransformedDataAsObjects();
    this.students = StudentDataFormatter.transformToStudentCards(studentData);
    this.groups = this.excelDataService.getAllGroups();
    this.filterResults('');
    console.log('Added data', this.students);
  }

  filterResults(text: string) {
    console.log('filterResults', text);
    if (!text) {
      this.filteredStudents = this.students;
      return;
    }
    this.filteredStudents = this.students.filter(
      students => students?.last_name.toLowerCase().includes(text.toLowerCase())
    );
    console.log('filteredStudents', this.filteredStudents);
  }
  onSelectGroupResult(groupName: string) {
    if(!groupName ||  undefined){
      this.filteredStudents = this.students;
    }
    this.filteredStudents = this.students.filter(
      student => student.group === groupName
    )
  }


  get visibleStudents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }
  onPageChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = event.pageIndex + 1;
  }
  onPageSizeChange(event: any): void {
    this.itemsPerPage = event.pageSize;
    this.currentPage = 1; // Reset to the first page when changing page size
  }

  clearFilters() {
    this.filteredStudents = this.students;
  }

}
