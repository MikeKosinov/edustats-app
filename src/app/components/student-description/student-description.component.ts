import {Component, Input, OnInit} from '@angular/core';
import {IMarksInterface} from "../../interfaces/marks/IMarks.interface";
import {mark} from "@angular/compiler-cli/src/ngtsc/perf/src/clock";
import {ExcelDataService} from "../../services/readExcel/excel-data.service";

@Component({
  selector: 'app-student-description',
  templateUrl: './student-description.component.html',
  styleUrls: ['./student-description.component.scss']
})

export class StudentDescriptionComponent implements OnInit {
  displayedColumns: string[] = ['index','discipline','mark','type_of_control','semester','teacher','date']
@Input() markDescription:IMarksInterface[];
  filteredMarksDescription:IMarksInterface[];
  filterByTypesOfControl = {exams:true, tests:true}
  constructor(private dataService:ExcelDataService) {

  }
  ngOnInit() {
    this.filteredMarksDescription = this.sortBySemesterASC(this.markDescription);
  }

  sortBySemesterASC(marks:IMarksInterface[]){
    return marks.sort((low,high)=>low.semester-high.semester)
  }


  filterChange() {
    if(!this.filterByTypesOfControl.tests&&!this.filterByTypesOfControl.exams){
      this.filteredMarksDescription=this.markDescription
    }
  this.filteredMarksDescription = this.markDescription.filter(desc =>
    (desc.type_of_control==='екзамен'&& this.filterByTypesOfControl.exams) ||
    (desc.type_of_control === 'залік' && this.filterByTypesOfControl.tests) )
  }

}
