import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../../models/student';
import { environment } from 'src/environments/environment';

import { Classe } from '../../models/classe';
import { ApiResponse } from '../../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  getStudents(page: number, limit: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.basUrl}/admin/users?page=${page}&pageSize=${limit}`)
  }
  addStudent(payload: FormData) {
    return this.http.post(`${environment.basUrl}/admin/add-user`, payload, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'authorization': `bearer ${localStorage.getItem('token')}` || ''
      }),
    })
  }
}
