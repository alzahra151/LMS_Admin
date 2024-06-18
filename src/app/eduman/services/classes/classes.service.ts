import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { ClassResponse, Classe } from '../../models/classe';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  getClasses(): Observable<ApiResponse<ClassResponse>> {
    return this.http.get<ApiResponse<ClassResponse>>(`${environment.basUrl}/classes`)
  }
}
