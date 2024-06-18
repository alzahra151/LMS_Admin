import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../models/api-response';
import { examRespone } from '../../models/exam';
import { environment } from 'src/environments/environment';
import { ExamStudentRespone } from '../../models/exam-student';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private http: HttpClient) { }

  // addExam(data:)
  getCourseExams(courseId: number): Observable<ApiResponse<examRespone>> {
    return this.http.get<ApiResponse<examRespone>>(`${environment.basUrl}/admin/course/${courseId}/exam`)
  }
  getExamById(id: number) {
    return this.http.get<ApiResponse<examRespone>>(`${environment.basUrl}/admin/exams/${id}`)
  }
  getExamStudents(id: number, page: number, limit: number) {
    return this.http.get<ApiResponse<ExamStudentRespone>>(`${environment.basUrl}/admin/exam/${id}/students?page=${page}&pageSize=${limit}`)
  }
}
