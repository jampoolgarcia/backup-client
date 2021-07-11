import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { configService } from 'src/app/shared/config/config-service';
import { DoctorI } from 'src/app/shared/model/doctor/doctor';
import { SpecialtyI } from 'src/app/shared/model/doctor/specialty';
import { AlertService } from 'src/app/shared/services/alert.service';
import { DateService } from 'src/app/shared/services/date.service';
import Swal from 'sweetalert2';
import { DoctorService } from '../../doctor.service';
import { SpecialtyService } from '../../specialty.service';

@Component({
  selector: 'app-form-doctor',
  templateUrl: './form-doctor.component.html',
  styleUrls: []
})
export class FormDoctorComponent implements OnInit {

  public fgValidators: FormGroup;
  public recordList: SpecialtyI[] = [];
  public data: DoctorI;
  @Output() updateList: EventEmitter<void> = new EventEmitter();


  constructor(
    private _service: DoctorService, 
    private _dateService: DateService, 
    private fb: FormBuilder, 
    public _serviceSpecialty: SpecialtyService, 
    private _alertService: AlertService) {
    this.buildingForm(null);
  }

  ngOnInit(): void {
    this.fillRecords();
  }

  fillRecords(): void{
    this._serviceSpecialty.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
      }, err =>{
        console.log(err);
        this._alertService.showErrorMessage('Uups...', err.error.error.message);
      }
    )
  }

  buildingForm(data: DoctorI): void{

    this.fgValidators = this.fb.group({
      id: [data?.id || ''],
      name: [data?.name || '', [Validators.required, Validators.pattern("[a-z A-Z]+"), Validators.minLength(5), Validators.maxLength(25)]],
      tci: [data?.ci.substring(0, 1) || '', [Validators.required]],
      ci: [data?.ci.substring(2, 11) || '', [Validators.required, Validators.pattern("[0-9]{8,11}")]],
      ctelf: [data?.phone.substring(0, 4) || '', [Validators.required]],
      telf: [data?.phone.substring(5,12) || '', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern("[0-9]{7,11}")]],
      sex: [data?.sex || '', [Validators.required]],
      dateBirth: [this._dateService.geDateformat(data?.dateBirth) || '', [Validators.required]],
      direction: [data?.direction || '', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      img: [data?.img || 'doctor.svg', Validators.required],
      specialty: [data?.specialtyId || '', [Validators.required]]
    })

  }

  test(value){
    console.log(value);
  }

  saveImg(event){

    const file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', file);

    this._service.onUploadImg(fd)
      .subscribe(img => {
          Swal.fire({
            icon: 'success',
            title: 'Registro',
            text: 'Imagen cargada exitosamente',
            showConfirmButton: true,
            timer: 4000
          }).then((result) => {
            this.fgValidators.patchValue({
              img: img.filename
            })
          })
      }, err => {
          Swal.fire({
              icon: 'error',
              title: 'Uups...',
              text: err,
              showConfirmButton: true,
              timer: 4000
          })
      })
  }

  onSubmit(){

    let data: DoctorI = this.getData();

    if(data.id == null){
      this.save(data);
    }else{
      this.update(data);
    }

  }

  getData(): DoctorI {
    return  {
      id: this.fgv.id,
      name: this.fgv.name,
      ci: this.fgv.tci +"-"+this.fgv.ci,
      phone: this.fgv.ctelf +"-"+this.fgv.telf,
      sex: this.fgv.sex,
      dateBirth: new Date(this.fgv.dateBirth),
      direction: this.fgv.direction,
      balance: 0,
      img: this.fgv.img,
      specialtyId: this.fgv.specialty  
    }
  }

  save(data: DoctorI){

    this._service.saveRecord(data)
            .subscribe(data => {
              this._alertService.showConfirmationMessage('Registro', 'Se ha registrado exitosamente.')
              .then((result) => {
                this.buildingForm(null);
                this.updateList.emit();
              }) 
    }, err => {  
      console.log(err);
      this._alertService.showErrorMessage('Uups...', err.error.error.message);
    });
  }

  update(data: DoctorI){
    this._service.updateRecord(data)
    .subscribe(data => {
      this._alertService.showConfirmationMessage('Registro', 'Se ha actualizado exitosamente.')
      .then((result) => {
        this.buildingForm(null);
        this.updateList.emit();
      })  
    }, err => {
      console.log(err);
      this._alertService.showErrorMessage('Uups...', err.error.error.message);
    })
  }

  get fgv(){
    return this.fgValidators.value
  }

  get name(){
    return this.fgValidators.get('name')
  }

  get tci(){
    return this.fgValidators.get('tci')
  }

  get ci(){
    return this.fgValidators.get('ci')
  }

  get ctelf(){
    return this.fgValidators.get('ctelf')
  }

  get telf(){
    return this.fgValidators.get('telf')
  }

  get sex(){
    return this.fgValidators.get('sex')
  }

  get dateBirth(){
    return this.fgValidators.get('dateBirth')
  }

  get direction(){
    return this.fgValidators.get('direction')
  }

  get specialty(){
    return this.fgValidators.get('specialty')
  }

}
