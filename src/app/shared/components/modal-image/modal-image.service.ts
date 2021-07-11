import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configService } from '../../config/config-service';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {


  constructor(private http: HttpClient) { }

  onUploadImage(file: File, id: string, type: 'doctor' | 'nurse' | 'patient'): Observable<{fileName}>{

    const fd = new FormData();
    fd.append('file', file);

    const result = this.http.put<{fileName}>(`${configService.URL_BASE}/image/${type}/${id}`, fd);
    
    return result;
  }

}
