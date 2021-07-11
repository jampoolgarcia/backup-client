import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { configService } from 'src/app/shared/config/config-service';
import { CategoryI } from 'src/app/shared/model/category';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: []
})
export class CategoryComponent implements OnInit {

  public fgValidators: FormGroup;
  public page_size: number = configService.PERSON_PAGE_SIZE;
  public page_number: number = 1;
  @Input() recordList: CategoryI[] = [];
  @Output() updateList: EventEmitter<void> = new EventEmitter();

  constructor(public _service: CategoryService, private fb: FormBuilder, private _alertService: AlertService) {
    this.buildingForm(null);
   }

  ngOnInit(): void {
  }

  buildingForm(data: CategoryI): void{

    if(!data){
      data = this.defaultData();
    }


    this.fgValidators = this.fb.group({
      id: [data.id],
      name: [data.name, [Validators.required, Validators.pattern("[a-z A-Z]+"), Validators.minLength(4), Validators.maxLength(25)]]
    })
  }

  defaultData(): CategoryI{
    return {
      id: null,
      name: ""
    }
  }

  

  onSubmit(): void{

    let data = this.getData();

    if(data.id == null){
      this.save(data);
    }else{
      this.update(data);
    }
  
  }

  save(data: CategoryI): void{
    this._service.saveNewRecord(data)
        .subscribe(data =>  {

          this._alertService.showConfirmationMessage('Registro', 'Se ha registrado exitosamente.')
          .then((result) => {
            this.fgValidators.reset(true);
            this.updateList.emit();
          })
        }, err => {
          console.log(err);
          this._alertService.showErrorMessage('Uups...', err.error.error.message);
        });
  }

  update(data: CategoryI): void{
    this._service.updateRecord(data)
    .subscribe(data =>  {

      this._alertService.showConfirmationMessage('Edición', 'Se ha editado exitosamente.')
      .then((result) => {
        this.fgValidators.reset(true);
        this.updateList.emit();
      })
    }, err => {
      console.log(err);
      this._alertService.showErrorMessage('Uups...', err.error.error.message);
    });
  }

  getData(): CategoryI{
    return {
      id: this.fgv.id,
      name: this.fgv.name
    }
  }

  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;
  }

  get fgv() {
    return this.fgValidators.value;
  }

  get name() {
    return this.fgValidators.get('name')
  }

}
