import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginDoctorService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ success: boolean; user?: any; message?: string }>(
      'http://localhost:3001/api/login-doctor',
      { email, password }
    );
  }
}
