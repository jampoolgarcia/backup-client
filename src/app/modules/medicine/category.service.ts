import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configService } from 'src/app/shared/config/config-service'
import { CategoryI } from 'src/app/shared/model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public entity: string = 'category';

  constructor(private http: HttpClient) { }

  getAllRecords(): Observable<CategoryI[]> {
    return this.http.get<CategoryI[]>(`${configService.URL_BASE}/${this.entity}`);
  }

  saveNewRecord(data: CategoryI): Observable<CategoryI>{
    delete data.id;
    return this.http.post<CategoryI>(
      `${configService.URL_BASE}/${this.entity}`, 
       data, 
    );
  }

  updateRecord(data: CategoryI): Observable<CategoryI>{
      return this.http.put<CategoryI>(
        `${configService.URL_BASE}/${this.entity}/${data.id}`, 
        data
      );
  }

  deleteRecord(id: string): Observable<any>{
     return this.http.delete<CategoryI>(
      `${configService.URL_BASE}/${this.entity}/${id}`  
      );
  }

}
