import { Component, Input, OnInit } from '@angular/core';
import  html2pdf from "html2pdf.js";
import { DoctorService } from 'src/app/modules/doctor/doctor.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: []
})
export class ReportComponent implements OnInit {

 @Input() title: string = 'Listado';
 @Input() headersList: string[] = [];
 @Input() propertyList: string[] = [];
 @Input() recordList = [];
  

  constructor(private _alertService: AlertService) { 
    
  }

  ngOnInit(): void {
    
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


  checkProperty(property){
    if(typeof property === "object"){
      return property.name;
    }else{
      return property;
    }
  }

}
