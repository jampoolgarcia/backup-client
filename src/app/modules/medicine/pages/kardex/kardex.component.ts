import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicineI } from 'src/app/shared/model/medicine';
import { AlertService } from 'src/app/shared/services/alert.service';
import { MedicineService } from '../../medicine.service';

@Component({
  selector: 'app-kardex',
  templateUrl: './kardex.component.html',
  styles: [
  ]
})
export class KardexComponent implements OnInit {

  public page_size: number = 5;
  public page_number: number = 1;
  public filterPost: string ='';
  public recordsList: MedicineI[] = [];

  constructor(private _service: MedicineService, private _alertService: AlertService) { }

  ngOnInit(): void {
  }

  
  fillRecords(){

    let date = new Date();

    this._service.getAllRecordsForDay(date).subscribe(
      data =>{
        this.recordsList = data;
      }, err =>{
        console.log(err);
        this._alertService.showErrorMessage('Uups...', err.error.error.message);
      }
    )
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

}
