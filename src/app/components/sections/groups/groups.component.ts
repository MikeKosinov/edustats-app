import {Component, OnInit} from '@angular/core';
import {ExcelDataService} from "../../../services/readExcel/excel-data.service";
import {criteriaArray} from "../../../helpers/criterias/statisticCriterias";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit{
  title:string = 'Статистичні дані  навчальної групи'
 groups:string[]=[];



  constructor(private dataService: ExcelDataService) {
  }
  ngOnInit() {
   this.groups = this.dataService.getAllGroups();
  }

   statisticsCriteria = criteriaArray;
}
