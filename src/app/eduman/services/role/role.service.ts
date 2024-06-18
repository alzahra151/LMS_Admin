import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  permissions: any
  userData: any
  constructor(private http: HttpClient) { }
  userRole: any
  async hasRole(role) {
    return new Promise((resolve, reject) => {
      if (!this.userRole) {
        this.getRoles().then(() => {
          resolve(this.userRole.result.role.alt_name === role);
        }).catch(error => {
          console.error('Error getting roles:', error);
          resolve(false);
        });
      } else {
        resolve(this.userRole.result.role.alt_name === role);
      }
    });
  }
  async getRoles() {
    return new Promise<void>((resolve, reject) => {
      const token = localStorage.getItem('token') || '';
      this.userData = atob(token.split('.')[1]);
      this.http.get(`${environment.basUrl}/admin/role/1`).subscribe({
        next: (role) => {
          this.userRole = role;
          resolve(); // Resolve the promise when the role is fetched
        },
        error: (error) => {
          console.log(error.error.message);
          reject(error); // Reject the promise if there's an error
        }
      });
    });
  }
  // }
}
