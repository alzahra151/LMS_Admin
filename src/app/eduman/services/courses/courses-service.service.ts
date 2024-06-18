import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { Course, CourseRespone } from '../../models/course';
@Injectable({
  providedIn: 'root'
})
export class CoursesServiceService {

  constructor(private http: HttpClient) { }
  getAllCousres(): Observable<ApiResponse<CourseRespone>> {
    return this.http.get<ApiResponse<CourseRespone>>(`${environment.basUrl}/admin/courses`)
  }
  getCousreById(id: any): Observable<ApiResponse<CourseRespone>> {
    return this.http.get<ApiResponse<CourseRespone>>(`${environment.basUrl}/courses/${id}`)
  }
  addCourse(payload: FormData) {
    return this.http.post(`${environment.basUrl}/courses`, payload, {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Accept-Language': 'ar',
        'authorization': `bearer ${localStorage.getItem('token')}` || ''
      }),
    })
  }
  upadateCourse(payload: any) {
    return this.http.post('test', { payload })
  }
  deleteCourse(payload: any) {
    return this.http.post('test', { payload })
  }
}
