import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserI } from 'src/app/shared/model/user';
import { AlertService } from 'src/app/shared/services/alert.service';
import { SecurityService } from 'src/app/shared/services/security.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [
  ]
})
export class EditComponent {

  @Output() updateList: EventEmitter<void> = new EventEmitter();
  public fgv: FormGroup;
  public record: UserI = null;

  constructor(private _service: SecurityService, private _alertService: AlertService, private fb: FormBuilder) {
    this.fgv = this.fb.group({
      role: ['', [Validators.required]],
      isActive: ['', [Validators.required]]
    })
  }

  

   buildingForm(){
    this.fgv.get('role').setValue(this.record.role);
    this.fgv.get('isActive').setValue(this.record.isActive);
   }
  

  onSubmit(){

    if(this.record.role !== this.role || this.record.isActive !== this.isActive){

      this._service.updateRecordStatusAndRole(this.record.id, this.role, this.isActive).subscribe(
        data =>{
          this._alertService.showConfirmationMessage('Actualización', 'Se ha actualizado exitosamente.');
          this.updateList.emit();
          this.record.role = this.role;
          this.record.isActive = this.isActive;
      }, err => {
        this._alertService.showErr(err);
      })
    }
    
  }

  get role(){
    return Number(this.fgv.get('role').value);
  }

  get isActive(){

    if(this.fgv.get('isActive').value === 'false' || !(this.fgv.get('isActive').value)) return false;

    return true;
  }

}
