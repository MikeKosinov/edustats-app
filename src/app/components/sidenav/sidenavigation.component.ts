import {Component, Input, OnInit} from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import {ActivatedRoute} from "@angular/router";
import {ExcelDataService} from "../../services/readExcel/excel-data.service";

@Component({
  selector: 'app-sidenavigation',
  templateUrl: './sidenavigation.component.html',
  styleUrls: ['./sidenavigation.component.scss'],
})
export class SidenavigationComponent implements OnInit {
  isFileUploaded:boolean;
  uploadMessage:string = "Необхідно завантажити дані для візуалізації результатів успішності студентів"
  isMenuOpen = true;
  constructor(private MenuService: MenuService,private dataService:ExcelDataService ,private route:ActivatedRoute) {}
  ngOnInit() {
    this.MenuService.isMenuOpen$.subscribe(
      (isOpen) => (this.isMenuOpen = isOpen)
    );
    this.dataService.getFileUploaded().subscribe(value => {
      this.isFileUploaded = value;
    })
  }
  isUploadDataComponent(): boolean {
    return this.route.snapshot.firstChild?.routeConfig?.path === 'uploadData';

  }

}
