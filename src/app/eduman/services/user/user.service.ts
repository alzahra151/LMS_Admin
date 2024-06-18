import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from '../../models/student';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  login(userData: Student) {
    return this.http.post(`${environment.basUrl}/login`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'ar'
      }),
    })
  }
  addUser(data: Student) {
    return this.http.post(`${environment.basUrl}/admin/add-user`, data)
  }
}
