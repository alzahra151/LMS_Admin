import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Student } from '../../models/student';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isLoggedInState: BehaviorSubject<Boolean>
  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  login(userData: Student) {
    return this.http.post(`${environment.basUrl}/login`, userData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept-Language': 'ar'
      }),
    }).pipe(map((response) => {
      this.isAuthenticated = true
      return response;
    }))
  }
  IsLoggedIn() {
    return this.isAuthenticated
  }
}
