import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  public title: string = "Inicio"

  constructor() { }

  showConfirmationMessage(title: string, text: string){
    return Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      text: text,
      showConfirmButton: true,
      timer: 4000
    })
  }

  showErrorMessage(title: string, text: string){
    return Swal.fire({
      position: 'center',
      icon: 'error',
      title: title,
      text: text,
      showConfirmButton: true,
      timer: 4000
    })
  }

  showErr(err){
    console.log(err)
    this.showErrorMessage(`${err.statusCode} ${err.name}`, err.error.error.message);
  }

}
