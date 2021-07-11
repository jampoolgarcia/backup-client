import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { configService } from 'src/app/shared/config/config-service';
import { NurseI } from 'src/app/shared/model/nurse';
import { NurseService } from '../../nurse.service';
import  html2pdf from "html2pdf.js";
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-list-nurse',
  templateUrl: './list-nurse.component.html',
  styles: [
  ]
})
export class ListNurseComponent implements OnInit {

  //@ViewChild(FormDoctorComponent, { static: true}) doctorForm: FormDoctorComponent;
  // @ViewChild(DetailtDoctorComponent, { static: true}) detailsDoctor: DetailtDoctorComponent;
  public filterPost: string ='';
  public page_size: number = configService.PERSON_PAGE_SIZE;
  public page_number: number = 1;
  public recordsList: NurseI[] = [];
  public load: boolean = true;

  constructor(public _service: NurseService, private _alertService: AlertService) { 
    this.fillRecords();
  }

  ngOnInit() {
    
  }

  fillRecords(){

    this.load = true;

    this._service.getAllRecords().subscribe(
      data =>{
        this.recordsList = data;
        this.load = false;
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

  edit(nurse: NurseI): void {
    //this.doctorForm.buildingForm(doctor);
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

}


