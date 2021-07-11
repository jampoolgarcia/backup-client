import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { configService } from '../config/config-service';
import { DoctorI } from '../model/doctor/doctor';
import { NurseI } from '../model/nurse';

// http://localhost:3000/api/search/doctors/adm

const url_base = configService.URL_BASE;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private entity: string = 'search'

  constructor(private http: HttpClient) { }


  getSearch(query: string, type: 'doctors' | 'nurses'){
    return this.http.get<any>(`${url_base}/${this.entity}/${type}/${query}`);
  }

}
