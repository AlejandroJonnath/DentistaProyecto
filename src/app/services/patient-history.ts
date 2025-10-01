import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PatientHistoryService {
  constructor(private http: HttpClient) {}

  getPatients() {
    return this.http.get<{ success: boolean; patients: any[] }>('http://localhost:3001/api/patients');
  }
}
