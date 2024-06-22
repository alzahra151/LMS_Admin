import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Lesson } from '../../models/lesson';

@Injectable({
  providedIn: 'root'
})
export class LeasonsServicesService {
  headers = new HttpHeaders({
    'Content-Type': 'multipart/form-data'
  });
  constructor(private http: HttpClient) { }
  getAllLeassons() {
    return this.http.get("test")
  }
  getLeassonById(id: any) {
    return this.http.get("test")
  }
  addLeasson(payload: Lesson) {
    return this.http.post(`${environment.basUrl}/admin/lessons/add`, payload)
  }
  upadateLeasson(payload: any) {
    return this.http.post('test', { payload })
  }
  deleteLeasson(payload: any) {
    return this.http.post('test', { payload })
  }
}
