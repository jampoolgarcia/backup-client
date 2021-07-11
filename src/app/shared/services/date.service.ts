import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  geDateformat(date: Date): string{

    if (date === null) return '0000-00-00';


    let d: Date = new Date(date);

    let year: string = d.getFullYear().toString();
    let month: string = d.getMonth()<9 ? `0${d.getMonth()+1}` : `${d.getMonth()+1}`;
    let day = d.getDate()<9 ? `0${d.getDate()+1}` : `${d.getDate()+1}`;

    return `${year}-${month}-${day}`;
  }

}
