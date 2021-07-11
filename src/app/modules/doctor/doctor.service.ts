import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { DoctorI } from '../../shared/model/doctor/doctor';
import { configService } from 'src/app/shared/config/config-service'
import { ImageI } from 'src/app/shared/model/image';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  public entity: string = 'doctor';

  constructor(private http: HttpClient) { }


  findCiRecord(ci:string): Observable<DoctorI>{
    return this.http.get<DoctorI>(`${configService.URL_BASE}/${this.entity}?filter[where][ci]=${ci}`);
  }


  getAllRecords(): Observable<DoctorI[]> {
    return this.http.get<DoctorI[]>(`${configService.URL_BASE}/${this.entity}?filter[include][]=specialty`);
  }

  findByIdRecordDetails(id: string): Observable<DoctorI>{
    return this.http.get<DoctorI>(`${configService.URL_BASE}/${this.entity}/${id}/details`);
  }


  saveRecord(data: DoctorI): Observable<DoctorI>{
    delete data.id;
    return this.http.post<DoctorI>(
      `${configService.URL_BASE}/${this.entity}`, 
       data, 
    );
  }

  updateRecord(data: DoctorI): Observable<DoctorI>{
      return this.http.put<DoctorI>(
        `${configService.URL_BASE}/${this.entity}/${data.id}`, 
        data
      );
  }

  deleteRecord(id: string): Observable<any>{
     return this.http.delete<DoctorI>(
      `${configService.URL_BASE}/${this.entity}/${id}`  
      );
  }

  onUploadImg(fd: FormData): Observable<ImageI> {
    return this.http.post<ImageI>(`${configService.URL_BASE}/doctorImage`, fd);
  }

   // getDetailtsDoctor(id: string){
  //   return this.http.get<DoctorI>(this.api_url+`/${id}?filter[include]=consults&filter[order]=date%20DESC&access_token=${this.token}`)
  // }

  // addCash(cash: number, money: number, id: string){
  //   return this.http.post<Number>(
  //     this.api_url+`/update?where=%7B%22id%22%3A%22${id}%22%7D&access_token=${this.token}`, 
  //     {
  //       money: money + cash
  //     }, 
  //     {headers: this.headers})
  //   .pipe(map(data => data));
  // }

  // AddPayment(id: string, pay: PaymentI){
  //   return this.http.post(this.api_url+`/${id}/addPay?access_token=${this.token}`,
  //   pay,
  //   {headers: this.headers}).pipe(map(data => data));
  // }


}
