import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ExcelDataService } from '../../services/readExcel/excel-data.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  isFileUploaded: boolean = false;
  selectedFile: File | null = null;
  selectedFileName: string = '';
  headers: string[] = [];
  studentSessionData: any[];

  constructor(private excelDataService: ExcelDataService) {}

  ngOnInit() {
    // this.excelDataService.getData().subscribe((result) =>{
    //   console.log("data from excel ",result)
    // })
  }
  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFile = selectedFile;
      this.selectedFileName = selectedFile.name;
      //this.excelDataService.readExcelFile(selectedFile);
      console.log('file name: ', this.selectedFileName);
    } else {
      console.log('Something wrong');
    }
  }

  getStoredData(): void {
    if (this.selectedFile) {
      this.excelDataService.readExcelFile(this.selectedFile);
      this.isFileUploaded = true;
      this.excelDataService.setFileUploaded(this.isFileUploaded);
      console.log(this.isFileUploaded);
    } else {
      console.error('error');
    }
  }
}
