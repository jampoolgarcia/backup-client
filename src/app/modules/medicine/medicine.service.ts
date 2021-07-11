import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MedicineI } from 'src/app/shared/model/medicine';
import { configService } from 'src/app/shared/config/config-service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MedicineService {
  
  public entity: string = 'medicine';

  constructor(private http: HttpClient) { }


  getAllRecords(): Observable<MedicineI[]> {
    return this.http.get<MedicineI[]>(`${configService.URL_BASE}/${this.entity}?filter[include][]=category`);
  }

  getAllRecordsWithQuantity(): Observable<MedicineI[]> {
    return this.http.get<MedicineI[]>(`${configService.URL_BASE}/${this.entity}?filter[where][quantity][gt]=0`);
  }

  findByIdRecord(id: string): Observable<MedicineI>{
    return this.http.get<MedicineI>(`${configService.URL_BASE}/${this.entity}/${id}`);
  }

  saveRecord(data: MedicineI): Observable<MedicineI>{
    delete data.id;
    return this.http.post<MedicineI>(
      `${configService.URL_BASE}/${this.entity}`, 
       data, 
    );
  }

  updateRecord(data: MedicineI): Observable<MedicineI>{
      return this.http.put<MedicineI>(
        `${configService.URL_BASE}/${this.entity}/${data.id}`, 
        data
      );
  }

  deleteRecord(id: string): Observable<any>{
     return this.http.delete<MedicineI>(
      `${configService.URL_BASE}/${this.entity}/${id}`  
      );
  }

  getAllRecordsForDay(date: Date): Observable<MedicineI[]> {
    return this.http.get<MedicineI[]>(`${configService.URL_BASE}/${this.entity}/product?filter[where][date][between][0]=${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()}&filter[where][date][between][1]=${date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() + 1)}&filter[include]=medicine`);
  }

  


}
