import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryI } from 'src/app/shared/model/category';
import { MedicineI } from 'src/app/shared/model/medicine';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CategoryService } from '../../category.service';
import { MedicineService } from '../../medicine.service';

@Component({
  selector: 'app-form-medicine',
  templateUrl: './form-medicine.component.html',
  styles: [
  ]
})
export class FormMedicineComponent implements OnInit {

  public fgValidators: FormGroup;
  public recordList: CategoryI[] = [];
  @Output() updateList: EventEmitter<void> = new EventEmitter();

  constructor(
    private _service: MedicineService, 
    private fb: FormBuilder, 
    public _serviceCategory: CategoryService, 
    private _alertService: AlertService
  ) { 
    this.buildingForm(null);
  }

  ngOnInit(): void {
    this.fillRecords();
  }

  fillRecords(): void{
    this._serviceCategory.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
      }, err =>{
        console.log(err);
        this._alertService.showErrorMessage('Uups...', err.error.error.message);
      }
    )
  }

  buildingForm(data: MedicineI): void{

    if(!data){
      data = this.defaultData();
    }

    this.fgValidators = this.fb.group({
      id: [data.id],
      description: [data.description, [Validators.required, Validators.pattern("[a-z A-Z]+"), Validators.minLength(3), Validators.maxLength(30)]],
      price: [data.price, [Validators.required, Validators.pattern("[0-9]+")]],
      min: [data.min, [Validators.required, Validators.pattern("[0-9]+")]],
      category: [data.categoryId, [Validators.required]]
    })

  }

  defaultData(): MedicineI {
    return {
      id: null,
      description: "",
      price: null,
      min: null,
      quantity: 0,
      categoryId: null
    }
  }

  onSubmit(){

    let data: MedicineI = this.getData();

    if(data.id == null){
      this.save(data);
    }else{
      this.update(data);
    }

  }

  getData(): MedicineI {
    return  {
      id: this.fgv.id,
      description: this.fgv.description,
      price: this.fgv.price,
      min: this.fgv.min,
      quantity: 0,
      categoryId: this.fgv.category   
    }
  }

  save(data: MedicineI){

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

  update(data: MedicineI){
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

  get description(){
    return this.fgValidators.get('description')
  }

  get price(){
    return this.fgValidators.get('price')
  }

  get min(){
    return this.fgValidators.get('min')
  }

  get category(){
    return this.fgValidators.get('category')
  }


}
