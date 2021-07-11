import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertService } from '../../services/alert.service';
import { ModalImageService } from './modal-image.service';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: []
})
export class ModalImageComponent {

  public imgTemp: string | ArrayBuffer = null;
  public newImg: File;

  constructor(
    public _service: ModalImageService,
    private _alert: AlertService,
    public dialogRef: MatDialogRef<ModalImageComponent>,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { type: 'doctor' | 'nurse' | 'patient', id: string, img: string}
  ) { }

  updateImg(file: File){

    this.newImg = file;

    if(!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () =>{
      this.imgTemp = reader.result;
      this.data.img = file.name;
    }
  }

  onUploadImg(){

    this._service.onUploadImage(this.newImg, this.data.id, this.data.type)
      .subscribe(data =>{
        this._snackBar.open('Imagen de usuario actualizada.', 'cerrar', {
          duration: 3000,
        });
        this.dialogRef.close(true);
      }, err => {
        this._alert.showErr(err);
      })
  }

  onClose(){
    this.imgTemp = null;
    this.newImg = null;
    this.dialogRef.close(false);
  }

}
