import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MedicineI } from 'src/app/shared/model/medicine';
import { AlertService } from 'src/app/shared/services/alert.service';
import { FormMedicineComponent } from '../../components/form-medicine/form-medicine.component';
import { MedicineService } from '../../medicine.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: [
  ]
})
export class StockComponent implements OnInit {

  @ViewChild(FormMedicineComponent, { static: true}) medicineForm:FormMedicineComponent;
  public page_size: number = 5;
  public page_number: number = 1;
  public filterPost: string ='';
  public recordList: MedicineI[] = [];

  constructor(private _service: MedicineService, private _alertService: AlertService) { 
    this.fillRecords();
  }

  ngOnInit() {
 
  }

  fillRecords(){
    this._service.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
      }, err =>{
        console.log(err);
        this._alertService.showErrorMessage('Uups...', err.error.error.message);
      }
    )
  }

  downloadPdf(){
    // var element = document.getElementById('content-pdf');
    // var opt = {
    //   margin:       0.2,
    //   filename:     'Doctores.pdf',
    //   image:        { type: 'jpeg', quality: 0.98 },
    //   html2canvas:  { scale: 2 },
    //   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    // };
    // html2pdf().set(opt).from(element).save();
  }

  edit(data: MedicineI): void {
    this.medicineForm.buildingForm(data);
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

}
