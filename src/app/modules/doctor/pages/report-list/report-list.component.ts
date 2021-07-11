import { Component, OnInit } from '@angular/core';
import  html2pdf from "html2pdf.js";
import { DoctorI } from 'src/app/shared/model/doctor/doctor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: []
})
export class ReportListComponent implements OnInit {

  public title: string = 'Lista de Doctores'
  public recordList: DoctorI[] = [];

  constructor(public _service: DoctorService, private _alertService: AlertService) { 
    this.fillRecords()
  }

  ngOnInit(): void {
    this.fillRecords();
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
    var element = document.getElementById('content-pdf');
    var opt = {
      margin:       0.2,
      filename:     'Doctores.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  }

}
