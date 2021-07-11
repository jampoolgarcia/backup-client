import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { configService } from 'src/app/shared/config/config-service'
import { SpecialtyI } from 'src/app/shared/model/doctor/specialty';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
export class SpecialtyService {

    public entity: string = 'specialty';
    public recordsList: SpecialtyI[] = [];

    constructor(private http: HttpClient) { }

  getAllRecords(): Observable<SpecialtyI[]>{
    return this.http.get<SpecialtyI[]>(`${configService.URL_BASE}/${this.entity}`);
  }

  getByIdRecord(id: string){
    return this.http.get<SpecialtyI>(`${configService.URL_BASE}/${this.entity}/${id}`);
  }

  saveNewRecord(specialty: SpecialtyI){
    delete specialty.id;
    return this.http.post<SpecialtyI>(
      `${configService.URL_BASE}/${this.entity}`, 
      specialty
    );
  }

  updateRecord(specialty: SpecialtyI){
      return this.http.put<any>(
        `${configService.URL_BASE}/${this.entity}/${specialty.id}`, 
        specialty
      );
  }

}