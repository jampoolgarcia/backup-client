import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DoctorI } from 'src/app/shared/model/doctor/doctor';
import { DoctorService } from '../../doctor.service';
import { configService } from '../../../../shared/config/config-service'
import { PageEvent } from '@angular/material/paginator';
import { FormDoctorComponent } from '../../pages/form-doctor/form-doctor.component';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SearchService } from 'src/app/shared/services/search.service';
import { ModalImageService } from 'src/app/shared/components/modal-image/modal-image.service';

import { MatDialog } from '@angular/material/dialog';
import { ModalImageComponent } from 'src/app/shared/components/modal-image/modal-image.component';



@Component({
  selector: 'app-list-doctor',
  templateUrl: './list-doctor.component.html',
  styleUrls: [],
})
export class ListDoctorComponent implements OnInit {

  @ViewChild(FormDoctorComponent, { static: true}) doctorForm: FormDoctorComponent;
  // @ViewChild(DetailtDoctorComponent, { static: true}) detailsDoctor: DetailtDoctorComponent;
  public filterPost: string ='';
  public page_size: number = configService.PERSON_PAGE_SIZE;
  public page_number: number = 1;
  public recordList: DoctorI[] = [];
  public title: string = "Listado de Doctores";
  public headersList: string[] = ["N°", "Nombre", "C.I", "Telefono", "Genero", "Especialidad"];
  public propertyList: string[] = ["name", "ci", "phone", "sex", "specialty"];
  public load: boolean = true;
  public tempRecordList: DoctorI[] = []; 

  constructor(
    public _service: DoctorService, 
    private _alert: AlertService,
    private _search: SearchService,
    private _modalImg: ModalImageService,
    private dialog: MatDialog
    ) { 
    this.fillRecords()
  }

  ngOnInit() {
    this._alert.title = 'Médicos';
  }

  fillRecords(){

    this.load = true;
    this._service.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
        this.page_number = 1;
        this.tempRecordList = data;
        this.load = false;
      }, err =>{
        this._alert.showErr(err);
      }
    )
  }

  getDoctor(data: DoctorI): void{
    console.log("getDoctor", data)
    // this.detailsDoctor.update(doctor.id);
  }

  edit(data: DoctorI): void {
    this.doctorForm.buildingForm(data);
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

  enterSearch(event){

    const { key, target: { value } } = event;

    if(key === 'Enter'){
      this.getSearch(value);
    }else if(key === 'Backspace' && value.length <=0 ){
      return this.recordList = this.tempRecordList;
    }
  }

  getSearch(search: string){

    if(search.length == 0){
      return this.recordList = this.tempRecordList;
    }

    this.load = true;
    this._search.getSearch(search, 'doctors')
      .subscribe(data =>{
        this.recordList = data;
        this.load = false;
      }, err =>{
        this._alert.showErr(err);
      })
  }

  openDialogImage(record: DoctorI){
    const dialogRef = this.dialog.open(ModalImageComponent, {
      disableClose: true,
      data: { type: 'doctor', id: record.id, img: record.img }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) this.fillRecords();
    });
  }

}
