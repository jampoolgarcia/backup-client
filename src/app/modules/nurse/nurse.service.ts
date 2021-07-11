import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configService } from 'src/app/shared/config/config-service';
import { ImageI } from 'src/app/shared/model/image';
import { NurseI } from 'src/app/shared/model/nurse';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NurseService {
  
  public entity: string = 'nurse';

  constructor(private http: HttpClient) { }


  findCiRecord(ci:string): Observable<NurseI>{
    return this.http.get<NurseI>(`${configService.URL_BASE}/${this.entity}?filter[where][ci]=${ci}`);
  }


  getAllRecords(): Observable<NurseI[]> {
    return this.http.get<NurseI[]>(`${configService.URL_BASE}/${this.entity}`);
  }

  findByIdRecord(id: string): Observable<NurseI>{
    return this.http.get<NurseI>(`${configService.URL_BASE}/${this.entity}/${id}`);
  }


  saveRecord(data: NurseI): Observable<NurseI>{
    delete data.id;
    return this.http.post<NurseI>(
      `${configService.URL_BASE}/${this.entity}`, 
       data, 
    );
  }

  updateRecord(data: NurseI): Observable<NurseI>{
      return this.http.put<NurseI>(
        `${configService.URL_BASE}/${this.entity}/${data.id}`, 
        data
      );
  }

  deleteRecord(id: string): Observable<any>{
     return this.http.delete<NurseI>(
      `${configService.URL_BASE}/${this.entity}/${id}`  
      );
  }

  onUploadImg(fd: FormData): Observable<ImageI> {
    return this.http.post<ImageI>(`${configService.URL_BASE}/doctorImage`, fd);
  }

}
