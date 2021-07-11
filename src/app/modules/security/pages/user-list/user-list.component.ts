import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { PageEvent } from '@angular/material/paginator';
import { UserI } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SecurityService } from 'src/app/shared/services/security.service';
import { EditComponent } from '../../components/edit/edit.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styles: [
  ]
})
export class UserListComponent implements OnInit {

  @ViewChild(EditComponent, { static: true}) edit: EditComponent;
  public recordList: UserI[] = [];
  public tempRecordList: UserI[] = [];
  public page_size: number = 5;
  public page_number: number = 1;
  public hidden: boolean = false;
  public filterPost: string ='';
  public load: boolean = true;

  constructor(private _service: SecurityService, private _alert: AlertService) { 
    this.fillRecords();
  }

  ngOnInit(): void {
    this._alert.title = 'Usuarios';
    
  }

  getNumber(i: number){
    return i + ((this.page_number-1)*this.page_size);
  }
 
  handlePage(e: PageEvent){
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex+1;  
  }

  editForm(record: UserI){
    this.edit.record = record;
    this.edit.buildingForm();
  }

  enterSearch(event){

    const { key, target: { value } } = event;

    if(key === 'Enter'){
      this.getSearch(value);
    }else if(key === 'Backspace' && value.length <=0 ){
      return this.recordList = this.tempRecordList;
    }
  }

  fillRecords(){

    this.load = true;

    this._service.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
        this.tempRecordList = data;
        this.page_number = 1;
        this.load = false;
      }, err =>{
        this._alert.showErr(err);
      }
    )
  }

  getSearch(search: string){

    if(search.length == 0){
      return this.recordList = this.tempRecordList;
    }

    this.load = true;
    this._service.getSearch(search)
      .subscribe(data =>{
        this.recordList = data;
        this.load = false;
      }, err =>{
        this._alert.showErr(err);
      })
  }

  getRole(user: UserI){
    return user.role == 1 ? 'Usuario' : 'Administrador';
  }

}
