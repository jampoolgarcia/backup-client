import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { configService } from 'src/app/shared/config/config-service';
import { DoctorI } from 'src/app/shared/model/doctor/doctor';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DoctorService } from '../../doctor.service';

@Component({
  selector: 'app-details-doctor',
  templateUrl: './details-doctor.component.html',
  styles: [
  ]
})
export class DetailsDoctorComponent implements OnInit {

public record: DoctorI;

  constructor(private _service: DoctorService, private rutaActiva: ActivatedRoute, private _alertService: AlertService) { 
    this.defaultData();
  }

  ngOnInit(): void {
    this.getDoctor();
  }

  getDoctor(){
    let id = this.rutaActiva.snapshot.params.id;
    this._service.findByIdRecordDetails(id).subscribe(
      data =>{
        this.record = data;
      }, err =>{
        console.log(err);
        this._alertService.showErrorMessage('Uups...',  err.error.error.message);
      }
    );
  }

  defaultData(): void {
    this.record = {
      id: null,
      name: "",
      ci: "",
      phone: "",
      sex: "",
      dateBirth: null,
      direction: "",
      balance: 0,
      img: "doctor.svg",
      specialtyId: "",
      specialty: {
        name: ''
      },
      consultation: [],
      payments: []
    }
  }


}
